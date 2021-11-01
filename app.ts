/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />
import { parseSearchParams } from "./parseParams.ts";
import { build } from "./build.ts";

console.log("Hello, packup!");
const params = parseSearchParams(location.search);
if (params.runnow) {
  const { runnow: _, ...options } = params;
  const code = await build(options);
  console.log("Finish building:", code);
  const blob = new Blob([code], { type: "application/javascript" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_self");
  URL.revokeObjectURL(url);
}

console.log(parseSearchParams(location.search));
