import { createOk, isErr, unwrapOk } from "./deps/option-t.ts";
import { RobustFetch, robustFetch } from "./deps/remoteLoader.ts";

const cache = await globalThis.caches.open("v1");
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
  if (!fromCache && /^https?$/.test(new URL(request.url).protocol)) {
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
