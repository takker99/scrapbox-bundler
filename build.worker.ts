/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { build, BuildFailure, initialize } from "./deps/esbuild-wasm.ts";
import { remoteLoader } from "./plugin.ts";
import { getLoader } from "././loader.ts";
import { fetch } from "./fetch.ts";
import { proxy } from "./proxy.ts";
import { fetchImportMap, ImportMap } from "./importmap.ts";
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
    const baseURL = await proxy(new URL(entryURL));
    const entryPointRes = await fetch(baseURL, reload);
    postMessage({ type: entryPointRes.type, url: entryPointRes.response.url });
    const loader = getLoader(entryPointRes.response);

    let importMap: ImportMap | undefined = undefined;
    if (importmap) {
      const url = await proxy(new URL(importmap, entryURL));
      const { type, json } = await fetchImportMap(
        url,
        reload,
      );
      postMessage({ type, url: url.toString() });
      importMap = json;
    }

    const result = await build({
      stdin: {
        contents: await entryPointRes.response.text(),
        loader,
      },
      write: false,
      ...options,
      plugins: [
        remoteLoader({
          baseURL,
          reload,
          fetch,
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
