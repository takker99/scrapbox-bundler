import { build as esbuild, BuildOptions } from "./deps/esbuild-wasm.ts";
import {
  remoteLoader,
  RemoteLoaderInit,
  resolver,
} from "./deps/remoteLoader.ts";
import { fetch } from "./fetch.ts";
import { Reload } from "./reload.ts";

export interface BuildInit
  extends Omit<BuildOptions, "write" | "plugins" | "metafile"> {
  onProgress?: RemoteLoaderInit["onProgress"];
  reload: Reload;
  /** as a data URL */
  importMapURL?: string;
}

export const build = (init: BuildInit) => {
  const { onProgress, importMapURL, reload, ...params } = init;

  return esbuild({
    ...params,
    write: false,
    metafile: true,
    plugins: [
      resolver({ importMapURL }),
      remoteLoader({
        fetch,
        reload,
        onProgress,
      }),
    ],
  });
};
