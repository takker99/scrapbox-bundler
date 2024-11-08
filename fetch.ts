import { createOk, isErr, unwrapOk } from "option-t/plain_result";
import { RobustFetch, robustFetch } from "./deps/remoteLoader.ts";
import { version } from "./deps/esbuild-wasm.ts";

// Clear caches when the version changes
(async () => {
  for (const name of await globalThis.caches.keys()) {
    if (name !== version) {
      const cache = await globalThis.caches.open(name);
      for (const req of await cache.keys()) {
        await cache.delete(req);
      }
    }
  }
})();
const cache = await globalThis.caches.open(version);

export const fetch: RobustFetch = async (req, cacheFirst) => {
  const request = proxy(req);
  if (cacheFirst) {
    const res = await cache.match(request);
    if (res) return createOk([res, true]);
  }
  const result = await robustFetch(request, cacheFirst);
  if (isErr(result)) {
    const res = await cache.match(request);
    return res ? createOk([res, true]) : result;
  }
  const [res, fromCache] = unwrapOk(result);
  if (!fromCache && !/^data:|^blob:/.test(request.url)) {
    await cache.put(request, res.clone());
  }
  return createOk([res, fromCache]);
};

const proxy = (req: Request): Request => {
  const url = new URL(req.url);
  if (url.hostname !== "scrapbox.io") return req;
  const redirectURL = new URL(url.pathname, globalThis.location.href);
  return new Request(redirectURL.href, req);
};
