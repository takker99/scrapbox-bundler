import { BundleOptions, isFormat } from "./types.ts";

export interface ParamOptions extends BundleOptions {
  run: boolean;
  output: "self" | "newtab" | "download";
  templateURL?: string;
}

export function parseSearchParams(searchParam: string): ParamOptions {
  const param = searchParam === "" ? "" : searchParam.slice(1);
  const params = new URLSearchParams(param);
  const bundle = params.get("bundle") === null ? false : true;
  const minify = params.get("minify") === null ? false : true;
  const format = params.get("format") ?? "esm";
  const define = parseDefine(params.getAll("define"));
  const charset = params.get("noUtf8") === null ? "utf8" : undefined;
  const run = params.get("run") === null ? false : true;
  const output = params.get("output") ?? "self";
  const jsxFactory = params.get("jsxFactory") ?? "h";
  const jsxFragment = params.get("jsxFragment") ?? "Fragment";
  const entryURL = params.get("url") ?? "";
  const reload = params.get("reload") === null ? false : true;
  const sourcemap = params.get("sourcemap") === null ? false : "inline";
  const external = params.getAll("external").map((url) =>
    // necessary because esbuild treats external as encoded URL
    encodeURI(url)
  );
  const importMapURL = params.get("importmap") ?? undefined;
  const templateURL = params.get("template") ?? undefined;

  return {
    bundle,
    minify,
    format: isFormat(format) ? format : "esm",
    charset,
    entryURL,
    external,
    define,
    run,
    output: isOutput(output) ? output : "self",
    jsxFactory,
    jsxFragment,
    reload,
    sourcemap,
    importMapURL: importMapURL ? new URL(importMapURL, entryURL) : undefined,
    templateURL,
  };
}

function isOutput(output: string): output is "self" | "newtab" | "download" {
  return ["self", "newtab", "download"].includes(output);
}
export function parseDefine(define: string[]) {
  const defines = {} as Record<string, string>;
  for (const pair of define) {
    const pos = pair.indexOf(":");
    if (pos < 0) continue;
    // the same keys are overwritten
    const key = pair.slice(0, pos);
    const value = pair.slice(pos + 1);
    defines[key] = value;
  }
  return defines;
}
