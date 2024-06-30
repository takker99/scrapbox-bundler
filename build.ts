/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />
import { build as esbuild, BuildOptions } from "./deps/esbuild-wasm.ts";
import { remoteLoader, RemoteLoaderInit } from "./deps/remoteLoader.ts";
import { fetch } from "./fetch.ts";

export interface BuildInit extends Omit<BuildOptions, "write" | "plugins"> {
  progressCallback?: RemoteLoaderInit["progressCallback"];
  reload?: boolean | URLPattern[];
  importMapURL?: URL;
}

export const build = (init: BuildInit) => {
  const { progressCallback, importMapURL, reload, ...params } = init;

  return esbuild({
    ...params,
    write: false,
    metafile: true,
    plugins: [remoteLoader({
      fetch,
      reload,
      progressCallback,
      importMapURL,
    })],
  });
};
