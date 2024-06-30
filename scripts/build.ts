import { build, denoPlugins, stop } from "../deps/esbuild.ts";

const result = await build({
  entryPoints: [
    new URL("../App.tsx", import.meta.url).href,
    new URL("../deps/worker.ts", import.meta.url).href,
  ],
  bundle: true,
  minify: true,
  format: "esm",
  outdir: "assets",
  write: false,
  plugins: [...denoPlugins()],
});

await Deno.writeTextFile(
  new URL("../assets/index.js", import.meta.url),
  result.outputFiles[0].text,
);
await Deno.writeTextFile(
  new URL("../assets/worker.js", import.meta.url),
  result.outputFiles[1].text,
);
await stop();
