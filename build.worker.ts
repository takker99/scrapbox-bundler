/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { build, initialize } from "./deps/esbuild-wasm.ts";
import { getLoader, remoteLoader } from "./loader.ts";
import { fetch } from "./fetch.ts";
import type { BuildResult, BundleOptions } from "./types.ts";

const postMessage = (data: BuildResult) => self.postMessage(data);

let initialized: Promise<void> | undefined;
self.addEventListener<"message">("message", async (event) => {
  initialized ??= initialize({
    wasmURL: "./esbuild.wasm",
    worker: false,
  });
  try {
    await initialized;
    const { entryURL, reload, ...options } = (event.data) as BundleOptions;
    const { response } = await fetch(entryURL);
    const loader = getLoader(response);
    const url = decodeURI(entryURL);
    // const { pathname } = new URL(url);
    // const sourcefile = pathname.split("/").pop();

    const result = await build({
      stdin: {
        contents: await response.text(),
        loader,
      },
      write: false,
      ...options,
      plugins: [
        remoteLoader({
          baseURL: new URL(entryURL),
          reload,
          progressCallback: postMessage,
        }),
      ],
    });
    postMessage({
      type: "built",
      code: result.outputFiles[0].contents,
    });
  } catch (e) {
    console.error(e);
    postMessage({ type: "unexpected", data: { ...e } });
  }
});
