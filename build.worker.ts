/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference lib="webworker.importscripts" />
import { build, initialize } from "./deps/esbuild-wasm.ts";
import { remoteLoader } from "./loader.ts";
import type { BundleOptions } from "./build.ts";

let initialized: Promise<void> | undefined;

self.addEventListener<"message">("message", async (event) => {
  initialized ??= initialize({
    wasmURL: "./esbuild.wasm",
    worker: false,
  });
  await initialized;
  const { entryURL, ...options } = (event.data) as BundleOptions;
  const result = await build({
    stdin: {
      contents: `import "${entryURL}";`,
    },
    write: false,
    ...options,
    plugins: [remoteLoader({ baseURL: new URL(entryURL) })],
  });
  self.postMessage(result.outputFiles[0].text);
});
