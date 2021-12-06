/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import type { Plugin } from "./deps/esbuild-wasm.ts";
import type { ImportInfo } from "./types.ts";
import { ImportMap, resolveImportMap } from "./deps/importmap.ts";
import type { CustomFetch } from "./fetch.ts";
import { relative } from "./path.ts";
import { getLoader } from "./loader.ts";
import { redirect } from "./redirect.ts";

export interface Options {
  importmap?: ImportMap;
  baseURL: URL;
  fetch: CustomFetch;
  reload: boolean;
  progressCallback?: (message: ImportInfo) => void;
}

const name = "remote-resource";
export const remoteLoader = (
  options: Options,
): Plugin => ({
  name,
  setup({ onResolve, onLoad, initialOptions: { external = [] } }) {
    const {
      importmap = { imports: {} },
      baseURL,
      fetch,
      reload,
      progressCallback,
    } = options ?? {};
    const importMap = resolveImportMap(importmap, baseURL);
    external = external.map((path) => new URL(path, baseURL).href);
    console.log(external);

    const skip = (path: string) => external.includes(path);

    onResolve(
      { filter: /.*/ },
      async ({ path, importer }) => {
        if (skip(path)) return { external: true };
        const resolvedPath = importMap.imports?.[path] ?? path;

        if (resolvedPath.startsWith("http")) {
          const url = await redirect(new URL(resolvedPath));
          if (skip(url.toString())) {
            console.log(`skip ${url}`);
            return {
              external: true,
              path: relative(baseURL, url),
            };
          }
          return {
            path: decodeURI(url.toString()),
            namespace: name,
          };
        }

        importer = importer === "<stdin>" ? baseURL.toString() : importer;
        const importURL = new URL(resolvedPath, importer).toString();
        const resolvedPath2 = importMap.imports?.[importURL] ?? importURL;
        if (resolvedPath2.startsWith("http")) {
          const url = await proxy(new URL(resolvedPath2));
          if (skip(url.toString())) {
            console.log(`skip ${url}`);
            return {
              external: true,
              path: relative(baseURL, url),
            };
          }
          return {
            path: decodeURI(url.toString()),
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
          url: path,
        });
        return { contents: await response.text(), loader: getLoader(response) };
      } catch (e) {
        if (!(e instanceof Response)) {
          throw e;
        }
        progressCallback?.({
          type: "fetch error",
          url: path,
          data: { status: e.status, statusText: e.statusText },
        });
        return;
      }
    });
  },
});
