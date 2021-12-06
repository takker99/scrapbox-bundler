import { redirect as resolvePaxDeno } from "./redirect/pax.deno.dev.ts";
import { redirect as resolveDenoLand } from "./redirect/deno.land.ts";

export function redirect(url: URL): Promise<URL> {
  switch (url.hostname) {
    case "pax.deno.dev":
      return Promise.resolve(resolvePaxDeno(url.pathname));
    case "deno.land":
      return resolveDenoLand(url.pathname);

    default:
      return Promise.resolve(url);
  }
}
