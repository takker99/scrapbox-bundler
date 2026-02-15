import { assertEquals } from "@std/assert/equals";
import { extname, loaderFromExtension, mimeType } from "./loader.ts";
import { restoreEntryPointURL } from "./restoreEntryPointURL.ts";
import { extname as pathExtname } from "@std/path/posix/extname";

// Simulate the replaceExtension function from App.tsx
const replaceExtension = (url: string, extension: string): string => {
  if (extension === "" || url.endsWith(extension)) return url;
  const replaced = url.replace(/\.[^/.]+$/, extension);
  return replaced === url ? `${url}${extension}` : replaced;
};

Deno.test("CSS file processing - normal case", () => {
  const filePath = "/https:/example.com/style.css";
  const loaderMap = new Map([["https://example.com/style.css", "css" as const]]);
  
  const url = restoreEntryPointURL(filePath);
  const outputExt = pathExtname(filePath);
  const loader = loaderFromExtension(outputExt) ?? loaderMap.get(url) ?? "text";
  const ext = outputExt === "" ? extname(loader) : outputExt;
  const fileName = replaceExtension(url, ext);
  
  assertEquals(url, "https://example.com/style");
  assertEquals(outputExt, ".css");
  assertEquals(loader, "css");
  assertEquals(ext, ".css");
  assertEquals(fileName, "https://example.com/style.css");
});

Deno.test("CSS file processing - missing loaderMap entry", () => {
  const filePath = "/https:/example.com/style.css";
  const loaderMap = new Map(); // Empty - simulating missing entry
  const entryPointExtensions = new Map([["https://example.com/style.css", ".css"]]);
  
  const url = restoreEntryPointURL(filePath);
  const outputExt = pathExtname(filePath);
  
  // New improved logic
  let loader = loaderFromExtension(outputExt);
  if (!loader) {
    loader = loaderMap.get(url);
  }
  if (!loader) {
    const originalExt = entryPointExtensions.get(url);
    if (originalExt) {
      loader = loaderFromExtension(originalExt);
    }
  }
  if (!loader) {
    loader = "text";
  }
  
  const ext = outputExt === "" ? extname(loader) : outputExt;
  const fileName = replaceExtension(url, ext);
  
  assertEquals(url, "https://example.com/style");
  assertEquals(outputExt, ".css");
  assertEquals(loader, "css"); // Should be "css" from loaderFromExtension
  assertEquals(ext, ".css");
  assertEquals(fileName, "https://example.com/style.css");
});

Deno.test("TypeScript file processing - double extension case", () => {
  const filePath = "/https:/example.com/module.ts.js";
  const loaderMap = new Map([["https://example.com/module.ts", "ts" as const]]);
  
  const url = restoreEntryPointURL(filePath);
  const outputExt = pathExtname(filePath);
  const loader = loaderFromExtension(outputExt) ?? loaderMap.get(url) ?? "text";
  const ext = outputExt === "" ? extname(loader) : outputExt;
  const fileName = replaceExtension(url, ext);
  
  assertEquals(url, "https://example.com/module.ts");
  assertEquals(outputExt, ".js");
  assertEquals(loader, "js"); // Gets "js" from loaderFromExtension(".js")
  assertEquals(ext, ".js");
  assertEquals(fileName, "https://example.com/module.js"); // Should replace .ts with .js
});

Deno.test("Text file without extension", () => {
  // Case where esbuild outputs a file without extension
  const filePath = "/https:/example.com/README";
  const loaderMap = new Map(); // Empty
  const entryPointExtensions = new Map([["https://example.com/README", ""]]);
  
  const url = restoreEntryPointURL(filePath);
  const outputExt = pathExtname(filePath);
  
  // New improved logic
  let loader = loaderFromExtension(outputExt);
  if (!loader) {
    loader = loaderMap.get(url);
  }
  if (!loader) {
    const originalExt = entryPointExtensions.get(url);
    if (originalExt) {
      loader = loaderFromExtension(originalExt);
    }
  }
  if (!loader) {
    loader = "text";
  }
  
  const ext = outputExt === "" ? extname(loader) : outputExt;
  const fileName = replaceExtension(url, ext);
  
  assertEquals(url, "https://example.com/README");
  assertEquals(outputExt, "");
  assertEquals(loader, "text"); // Defaults to "text"
  assertEquals(ext, ".txt"); // extname("text") returns ".txt"
  assertEquals(fileName, "https://example.com/README.txt"); // Appends .txt
});

Deno.test("CSS file with missing output extension - uses fallback", () => {
  // Edge case: esbuild outputs without extension, but we have original extension
  const filePath = "/https:/example.com/custom-style";
  const loaderMap = new Map(); // Empty
  const entryPointExtensions = new Map([["https://example.com/custom-style", ".css"]]);
  
  const url = restoreEntryPointURL(filePath);
  const outputExt = pathExtname(filePath);
  
  // New improved logic
  let loader = loaderFromExtension(outputExt);
  if (!loader) {
    loader = loaderMap.get(url);
  }
  if (!loader) {
    const originalExt = entryPointExtensions.get(url);
    if (originalExt) {
      loader = loaderFromExtension(originalExt);
    }
  }
  if (!loader) {
    loader = "text";
  }
  
  const ext = outputExt === "" ? extname(loader) : outputExt;
  const fileName = replaceExtension(url, ext);
  
  assertEquals(url, "https://example.com/custom-style");
  assertEquals(outputExt, "");
  assertEquals(loader, "css"); // Uses fallback from original extension!
  assertEquals(ext, ".css"); // Should use .css not .txt
  assertEquals(fileName, "https://example.com/custom-style.css");
});
