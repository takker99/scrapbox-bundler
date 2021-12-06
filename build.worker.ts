/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { build, BuildFailure, initialize } from "./deps/esbuild-wasm.ts";
import { remoteLoader } from "./plugin.ts";
import { getLoader } from "././loader.ts";
import { fetch } from "./fetch.ts";
import { redirect } from "./redirect.ts";
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
    const { entryURL, reload, importMapURL, ...options } =
      (event.data) as BundleOptions;
    const baseURL = await redirect(new URL(entryURL));
    const { type, response } = await fetch(baseURL, reload);
    postMessage({ type, url: baseURL.href });
    const loader = getLoader(response);

    let importmap: ImportMap | undefined = undefined;
    if (importMapURL) {
      const url = await redirect(new URL(importMapURL, entryURL));
      const { type, json } = await fetchImportMap(
        url,
        reload,
      );
      postMessage({ type, url: url.toString() });
      importmap = json;
    }

    const result = await build({
      stdin: {
        contents: await response.text(),
        loader,
      },
      write: false,
      ...options,
      plugins: [
        remoteLoader({
          baseURL,
          reload,
          fetch,
          importmap,
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
