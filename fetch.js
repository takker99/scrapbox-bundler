let cache;
export async function fetch(path, reload = false) {
  const url = new URL(path);
  cache ??= await globalThis.caches.open("v1");
  if (reload) {
    return await fetchNetworkFirst(url);
  }
  const res = await cache.match(url.toString());
  if (!res) return await fetchNetworkFirst(url);
  return {
    type: "cache",
    response: res,
  };
}
async function fetchNetworkFirst(url) {
  cache ??= await globalThis.caches.open("v1");
  try {
    const res = await globalThis.fetch(proxy(new URL(url.toString())).href);
    if (!res.ok) throw res;
    cache.put(url.toString(), res.clone());
    return {
      type: "remote",
      response: res,
    };
  } catch (e) {
    const res = await cache.match(url.toString());
    if (!res) throw e;
    return {
      type: "cache",
      response: res,
    };
  }
}
/**
 * @param {URL} url
 * @return {URL}
 */
const proxy = (url) =>
  url.hostname !== "scrapbox.io" ? url :
    new URL(url.pathname, location);
