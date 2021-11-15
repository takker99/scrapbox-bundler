/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { build, BuildFailure, initialize } from "./deps/esbuild-wasm.ts";
import { remoteLoader } from "./plugin.ts";
import { getLoader } from "././loader.ts";
import { fetch } from "./fetch.ts";
import { fetchImportMap } from "./importmap.ts";
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
    const { entryURL, reload, importmap, ...options } =
      (event.data) as BundleOptions;
    const { response } = await fetch(entryURL, reload);
    const loader = getLoader(response);

    const importMap = importmap
      ? (await fetchImportMap(new URL(importmap, entryURL), reload)).json
      : undefined;

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
          importmap: importMap,
          progressCallback: postMessage,
        }),
      ],
    });
    postMessage({
      type: "built",
      code: result.outputFiles[0].contents,
    });
  } catch (e) {
    if (e instanceof Response) {
      postMessage({
        type: "fetch error",
        url: e.url,
        data: { status: e.status, statusText: e.statusText },
      });
      return;
    }
    if (e instanceof SyntaxError) {
      console.error(e);
      postMessage({
        type: "unexpected error",
        data: {
          stack: e.stack,
          message: e.message,
        },
      });
      return;
    }
    if (e instanceof Error) {
      postMessage({
        type: "build error",
        data: JSON.parse(JSON.stringify(e)) as BuildFailure,
      });
      return;
    }
    console.error(e);
    postMessage({ type: "unexpected error", data: { ...e } });
  }
});
