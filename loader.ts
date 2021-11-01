/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import type { Plugin } from "./deps/esbuild-wasm.ts";
import {
  ImportMap,
  resolveModuleSpecifier,
} from "https://deno.land/x/importmap@0.2.0/mod.ts";

const loaderList = [
  "js",
  "jsx",
  "ts",
  "tsx",
  "css",
  "json",
  "text",
  "base64",
  "file",
  "dataurl",
  "binary",
  "default",
] as const;
type Loader = (typeof loaderList)[number];
function isLoader(loader: string): loader is Loader {
  return (loaderList as [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ]).includes(loader);
}

export interface Options {
  importmap?: ImportMap;
  baseURL: URL;
}

const name = "remote-resource";
export const remoteLoader = (
  options: Options,
): Plugin => ({
  name,
  setup({ onResolve, onLoad }) {
    const { importmap = { imports: {} }, baseURL } = options ?? {};
    onResolve(
      { filter: /.*/ },
      ({ path, namespace, importer, resolveDir }) => {
        const resolvedPath = resolveModuleSpecifier(
          path,
          importmap,
          baseURL,
        );
        if (resolvedPath.startsWith("http")) {
          console.log({ path, importer, resolveDir }, "->", resolvedPath);
          return {
            path: resolvedPath,
            namespace: name,
          };
        }
        if (namespace === name) {
          console.log(
            { importer, resolveDir },
            "->",
            new URL(resolvedPath, importer).toString(),
          );
          return {
            path: new URL(resolvedPath, importer).toString(),
            namespace: name,
          };
        }
        console.log(
          { resolvedPath, resolveDir },
          "->",
          new URL(resolvedPath, resolveDir).toString(),
        );
        return { path: new URL(resolvedPath, resolveDir).toString() };
      },
    );
    onLoad({ filter: /.*/, namespace: name }, async ({ path }) => {
      const res = await fetch(path);
      console.log(`Download ${path}`);
      if (!res.ok) {
        throw res;
      }
      return { contents: await res.text(), loader: getLoader(res) };
    });
  },
});

function getLoader(response: Response): Loader {
  const url = response.url;
  const ext = url.split(".").pop();
  if (ext && isLoader(ext)) return ext;
  if (ext === "mjs") return "js";
  const contentType = response.headers.get("Content-Type") ?? "text/plain";
  return isLoader(contentType) ? contentType : "text";
}
