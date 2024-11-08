#!/usr/bin/env deno run --config deno.jsonc
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts#^";

const router = new Router();
router.get(
  "/api/(.*)",
  async (ctx) => {
    const req = ctx.request;
    const url = `https://scrapbox.io${req.url.pathname}`;
    console.log(`fetch ${url}...`);
    const res = await fetch(url, {
      ...req,
    });
    console.log(`fetched.`);
    for (
      const name of [
        "Content-Type",
        "X-Content-Type-Options",
        "X-Frame-Options",
        "Date",
        "Etag",
        "Vary",
        "Via",
        "X-This-Is-Not-A-Vulnerability",
        "Strict-Transport-Security",
      ]
    ) {
      if (!res.headers.has(name)) continue;

      ctx.response.headers.set(name, res.headers.get(name)!);
    }
    ctx.response.headers.set("Cache-Control", "no-cache, max-age=0");
    ctx.response.status = res.status;
    const mimeType = ctx.response.headers.get("Content-Type") ?? "text/plain";
    console.log({ mimeType });
    ctx.response.body = mimeType.startsWith("image")
      ? res.body
      : await res.text();
  },
);

const app = new Application();
app.addEventListener("error", (evt) => {
  // Will log the thrown error to the console.
  console.log(evt.error);
});

app.use(router.routes());
app.use(router.allowedMethods());

export default app.handle;
