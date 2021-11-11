/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import type { Plugin } from "./deps/esbuild-wasm.ts";
import type { ImportInfo } from "./types.ts";
import {
  ImportMap,
  resolveImportMap,
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
  reload: boolean;
  progressCallback?: (message: ImportInfo) => void;
}

const name = "remote-resource";
export const remoteLoader = (
  options: Options,
): Plugin => ({
  name,
  async setup({ onResolve, onLoad, initialOptions: { external } }) {
    const {
      importmap = { imports: {} },
      baseURL,
      reload,
      progressCallback,
    } = options ?? {};
    const importMap = resolveImportMap(importmap, baseURL);

    const cache = await globalThis.caches.open("v1");
    if (reload) {
      const keys = await cache.keys();
      await Promise.all(keys.map((key) => cache.delete(key)));
    }

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
            path: resolvedPath,
            namespace: name,
          };
        }
        const importURL = new URL(resolvedPath, importer).toString();
        if (skip(path)) return { external: true };
        if (importURL.startsWith("http")) {
          console.log(`(${resolvedPath}, ${importer}) -> ${importURL}`);
          return {
            path: importURL,
            namespace: name,
          };
        }
        return { external: true };
      },
    );
    onLoad({ filter: /^http/, namespace: name }, async ({ path }) => {
      const url = new URL(path);
      if (url.hostname === "scrapbox.io") {
        url.port = "";
        url.protocol = "https:";
        url.hostname = "scrapbox-proxy-server.vercel.app";
      }
      let res: Response | undefined;
      const cachedRes = await cache.match(url.toString());
      if (cachedRes) {
        progressCallback?.({ type: "cache", url: url.toString() });
        res = cachedRes;
      } else {
        res = await fetch(url.toString());
        if (!res.ok) {
          progressCallback?.({
            type: "error",
            url: url.toString(),
            data: { status: res.status, statusText: res.statusText },
          });
          return;
        }
        progressCallback?.({ type: "remote", url: url.toString() });
        cache.put(url.toString(), res.clone());
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
