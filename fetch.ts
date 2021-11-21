/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { proxy as switcher } from "./proxy.ts";

let cache: Cache | undefined;

export async function fetch(
  path: URL | string,
  reload = false,
  proxy = switcher,
) {
  const url = await proxy(new URL(path));
  cache ??= await globalThis.caches.open("v1");
  if (reload) {
    return await fetchNetworkFirst(url);
  }

  const res = await cache.match(url.toString());
  if (!res) return await fetchNetworkFirst(url);
  return { type: "cache", response: res } as const;
}

async function fetchNetworkFirst(url: URL | string) {
  cache ??= await globalThis.caches.open("v1");
  try {
    const res = await globalThis.fetch(url.toString());
    if (!res.ok) throw res;
    cache.put(url.toString(), res.clone());
    return { type: "remote", response: res } as const;
  } catch (e) {
    const res = await cache.match(url.toString());
    if (!res) throw e;
    return { type: "cache", response: res } as const;
  }
}
