import { RemoteLoaderInit } from "./deps/remoteLoader.ts";

const cache = await globalThis.caches.open("v1");
export const fetch: RemoteLoaderInit["fetch"] = async (req, cacheFirst) => {
  const request = proxy(req);
  if (cacheFirst) {
    const res = await cache.match(request);
    if (res) return [res, true];
  }

  try {
    const res = await globalThis.fetch(request);
    if (res.ok) {
      await cache.put(request, res.clone());
      return [res, false];
    }
    throw new TypeError(`${res.status} ${res.statusText}`);
  } catch (e: unknown) {
    if (!(e instanceof TypeError)) throw e;
    const res = await cache.match(request);
    if (res) return [res, true];
    throw e;
  }
};

const proxy = (req: Request): Request => {
  const url = new URL(req.url);
  if (url.hostname !== "scrapbox.io") return req;
  const redirectURL = new URL(url.pathname, globalThis.location.href);
  return new Request(redirectURL.href, req);
};
