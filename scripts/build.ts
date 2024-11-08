import { denoPlugins } from "@luca/esbuild-deno-loader";
import { fromFileUrl } from "@std/path/from-file-url";
import { build, stop } from "esbuild";

await build({
  entryPoints: {
    "index": new URL("../App.tsx", import.meta.url).href,
    "worker": new URL("../deps/worker.ts", import.meta.url).href,
  },
  bundle: true,
  minify: true,
  format: "esm",
  outdir: "assets",
  banner: {
    js: "// deno-lint-ignore-file\n// deno-fmt-ignore-file",
  },
  jsx: "automatic",
  jsxImportSource: "npm:preact@10",
  sourcemap: "linked",
  plugins: [
    ...denoPlugins({
      configPath: fromFileUrl(new URL("../deno.jsonc", import.meta.url)),
    }),
  ],
});

await stop();
