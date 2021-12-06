/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import type { Plugin } from "./deps/esbuild-wasm.ts";
import type { ImportInfo, SkipInfo } from "./types.ts";
import {
  ImportMap,
  resolveImportMap,
  resolveModuleSpecifier,
} from "./deps/importmap.ts";
import type { CustomFetch } from "./fetch.ts";
import { relative } from "./path.ts";
import { getLoader } from "./loader.ts";
import { redirect } from "./redirect.ts";
import { isBareModuleName } from "./utils.ts";

export interface Options {
  importmap?: ImportMap;
  baseURL: URL;
  fetch: CustomFetch;
  reload: boolean;
  progressCallback?: (message: ImportInfo | SkipInfo) => void;
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
    external = external.map((path) =>
      isBareModuleName(path) ? path : new URL(path, baseURL).href
    );

    onResolve(
      { filter: /.*/ },
      async ({ path, importer }) => {
        if (!isBareModuleName(path)) {
          importer = importer === "<stdin>" ? baseURL.href : importer;
          path = new URL(path, importer).href;
        }
        const resolvedPath = resolveModuleSpecifier(path, importMap, baseURL);

        if (isBareModuleName(resolvedPath)) {
          progressCallback?.({
            type: "skip",
            url: resolvedPath,
          });
          return { external: true, path: resolvedPath };
        }

        if (external.includes(resolvedPath)) {
          progressCallback?.({
            type: "skip",
            url: resolvedPath,
          });
          return {
            external: true,
            path: relative(baseURL, new URL(resolvedPath)),
          };
        }

        const url = await redirect(new URL(resolvedPath));
        return {
          path: decodeURI(url.href),
          namespace: name,
        };
      },
    );
    onLoad({ filter: /^http|^file/, namespace: name }, async ({ path }) => {
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
