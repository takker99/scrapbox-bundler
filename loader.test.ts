import { assertEquals } from "@std/assert/equals";
import { extname, loaderFromExtension, mimeType } from "./loader.ts";

Deno.test("mimeType: text uses text/plain", () => {
  assertEquals(mimeType("text"), "text/plain");
});

Deno.test("mimeType: css uses text/css", () => {
  assertEquals(mimeType("css"), "text/css");
});

Deno.test("extname: text returns .txt", () => {
  assertEquals(extname("text"), ".txt");
});

Deno.test("loaderFromExtension maps common extensions", () => {
  assertEquals(loaderFromExtension(".js"), "js");
  assertEquals(loaderFromExtension(".mjs"), "js");
  assertEquals(loaderFromExtension(".cjs"), "js");
  assertEquals(loaderFromExtension(".css"), "css");
  assertEquals(loaderFromExtension(".json"), "json");
  assertEquals(loaderFromExtension(".map"), "json");
  assertEquals(loaderFromExtension(".txt"), "text");
});
