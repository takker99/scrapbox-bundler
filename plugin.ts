/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import type { Plugin } from "./deps/esbuild-wasm.ts";
import type { ImportInfo } from "./types.ts";
import { ImportMap, resolveImportMap } from "./deps/importmap.ts";
import { fetch } from "./fetch.ts";
import { relative } from "./path.ts";
import { getLoader } from "./loader.ts";

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

        if (resolvedPath.startsWith("http")) {
          if (skip(resolvedPath)) {
            console.log(`skip ${resolvedPath}`);
            return {
              external: true,
              path: relative(baseURL.toString(), resolvedPath),
            };
          }
          return {
            path: decodeURI(resolvedPath),
            namespace: name,
          };
        }
        importer = importer === "<stdin>" ? baseURL.toString() : importer;
        const importURL = new URL(resolvedPath, importer).toString();
        const resolvedPath2 = importMap.imports?.[importURL] ?? importURL;
        if (resolvedPath2.startsWith("http")) {
          if (skip(resolvedPath2)) {
            console.log(`skip ${resolvedPath2}`);
            return {
              external: true,
              path: relative(baseURL.toString(), resolvedPath2),
            };
          }
          return {
            path: decodeURI(resolvedPath2),
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
          type: "fetch error",
          url: e.url,
          data: { status: e.status, statusText: e.statusText },
        });
        return;
      }
    });
  },
});
