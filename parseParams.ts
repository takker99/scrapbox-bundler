import { BundleOptions, isFormat } from "./types.ts";

export type ParamOptions = BundleOptions & {
  run: boolean;
  output: "self" | "newtab" | "download";
  templateURL?: string;
};

export function parseSearchParams(searchParam: string): ParamOptions {
  const param = searchParam === "" ? "" : searchParam.slice(1);
  const params = new URLSearchParams(param);
  const bundle = params.get("bundle") === null ? false : true;
  const minify = params.get("minify") === null ? false : true;
  const format = params.get("format") ?? "esm";
  const charset = params.get("noUtf8") === null ? "utf8" : undefined;
  const run = params.get("run") === null ? false : true;
  const output = params.get("output") ?? "self";
  const jsxFactory = params.get("jsxFactory") ?? "h";
  const jsxFragment = params.get("jsxFragment") ?? "Fragment";
  const entryURL = params.get("url") ?? "";
  const reload = params.get("reload") === null ? false : true;
  const sourcemap = params.get("sourcemap") === null ? false : "inline";
  const external = params.getAll("external");
  const importMapURL = params.get("importmap") ?? undefined;
  const templateURL = params.get("template") ?? undefined;

  return {
    bundle,
    minify,
    format: isFormat(format) ? format : "esm",
    charset,
    entryURL,
    external,
    run,
    output: isOutput(output) ? output : "self",
    jsxFactory,
    jsxFragment,
    reload,
    sourcemap,
    importMapURL,
    templateURL,
  };
}

function isOutput(output: string): output is "self" | "newtab" | "download" {
  return ["self", "newtab", "download"].includes(output);
}
