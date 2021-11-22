import { proxy as proxyPaxDeno } from "./proxy/pax.deno.dev.ts";
import { proxy as proxyDenoLand } from "./proxy/deno.land.ts";

export function proxy(url: URL): Promise<URL> {
  switch (url.hostname) {
    case "scrapbox.io": {
      const newURL = new URL(url.toString());
      newURL.port = "";
      newURL.protocol = "https:";
      newURL.hostname = "scrapbox-proxy-server.vercel.app";
      return Promise.resolve(newURL);
    }
    case "pax.deno.dev":
      return Promise.resolve(proxyPaxDeno(url.pathname));
    case "deno.land":
      return proxyDenoLand(url.pathname);

    default:
      return Promise.resolve(url);
  }
}
