/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import type { Plugin } from "./deps/esbuild-wasm.ts";
import type { ImportInfo } from "./types.ts";
import {
  ImportMap,
  resolveImportMap,
} from "https://deno.land/x/importmap@0.2.0/mod.ts";
import { fetch } from "./fetch.ts";

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
export type Loader = (typeof loaderList)[number];
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
  reload: boolean;
  progressCallback?: (message: ImportInfo) => void;
}

const name = "remote-resource";
export const remoteLoader = (
  options: Options,
): Plugin => ({
  name,
  setup({ onResolve, onLoad, initialOptions: { external } }) {
    const {
      importmap = { imports: {} },
      baseURL,
      reload,
      progressCallback,
    } = options ?? {};
    const importMap = resolveImportMap(importmap, baseURL);

    const skip = (path: string) => external?.includes?.(path) ?? false;

    onResolve(
      { filter: /.*/ },
      ({ path, importer }) => {
        if (skip(path)) return { external: true };
        const resolvedPath = importMap.imports?.[path] ?? path;
        if (skip(path)) return { external: true };

        if (resolvedPath.startsWith("http")) {
          console.log(`(${path}, ${importer}) -> ${resolvedPath}`);
          return {
            path: decodeURI(resolvedPath),
            namespace: name,
          };
        }
        importer = importer === "<stdin>" ? baseURL.toString() : importer;
        const importURL = new URL(resolvedPath, importer).toString();
        if (skip(path)) return { external: true };
        if (importURL.startsWith("http")) {
          console.log(`(${resolvedPath}, ${importer}) -> ${importURL}`);
          return {
            path: decodeURI(importURL),
            namespace: name,
          };
        }
        return { external: true };
      },
    );
    onLoad({ filter: /^http/, namespace: name }, async ({ path }) => {
      try {
        const { type, response } = await fetch(path, reload);
        progressCallback?.({
          type,
          url: response.url,
        });
        return { contents: await response.text(), loader: getLoader(response) };
      } catch (e) {
        if (!(e instanceof Response)) {
          throw e;
        }
        progressCallback?.({
          type: "error",
          url: e.url,
          data: { status: e.status, statusText: e.statusText },
        });
        return;
      }
    });
  },
});

export function getLoader(response: Response): Loader {
  const url = response.url;
  const ext = url.split(".").pop();
  if (ext && isLoader(ext)) return ext;
  if (ext === "mjs") return "js";
  const contentType = response.headers.get("Content-Type") ?? "text/plain";
  return isLoader(contentType) ? contentType : "text";
}
