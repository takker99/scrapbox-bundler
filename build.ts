/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />
import { getPromiseSettledAnytimes } from "./utils.ts";
import type { BuildResult, BundleOptions } from "./types.ts";

const worker = new Worker("./assets/worker.js");

export async function* build(params: BundleOptions) {
  const [waitMessage, resolve, reject] = getPromiseSettledAnytimes<
    BuildResult,
    MessageEvent
  >();
  worker.postMessage(params);
  const callback = (event: MessageEvent) => resolve(event.data as BuildResult);
  worker.addEventListener(
    "message",
    callback,
  );
  const onMessageError = (e: MessageEvent) => reject(e);
  worker.addEventListener("messageerror", onMessageError);
  try {
    while (true) {
      const data = await waitMessage();
      if (data.type === "error" || data.type === "unexpected") {
        throw data;
      }
      yield data;
      if (data.type === "built") break;
      continue;
    }
  } finally {
    worker.removeEventListener("message", callback);
  }
}
