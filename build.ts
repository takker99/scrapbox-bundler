import { build as esbuild, BuildOptions } from "@takker/esbuild-wasm-no-blob";
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

  return esbuild<
    Omit<BuildOptions, "write" | "metafile"> & { write: false; metafile: true }
  >({
    ...params,
    write: false,
    metafile: true,
    plugins: [
      //@ts-ignore - esbuild types are not up to date
      resolver({ importMapURL }),
      //@ts-ignore - esbuild types are not up to date
      remoteLoader({
        fetch,
        reload,
        onProgress,
      }),
    ],
  });
};
