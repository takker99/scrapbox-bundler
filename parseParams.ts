import { BundleOptions, isFormat } from "./types.ts";

export type ParamOptions = BundleOptions & {
  run: boolean;
};

export function parseSearchParams(searchParam: string): ParamOptions {
  const param = searchParam === "" ? "" : searchParam.slice(1);
  const params = new URLSearchParams(param);
  const bundle = params.get("bundle") === null ? false : true;
  const minify = params.get("minify") === null ? false : true;
  const format = params.get("format") ?? "esm";
  const charset = params.get("noUtf8") === null ? "utf8" : undefined;
  const run = params.get("run") === null ? false : true;
  const jsxFactory = params.get("jsxFactory") ?? "h";
  const jsxFragment = params.get("jsxFragment") ?? "Fragment";
  const entryURL = params.get("url") ?? "";
  const reload = params.get("reload") === null ? false : true;
  const sourcemap = params.get("sourcemap") === null ? false : "inline";

  return {
    bundle,
    minify,
    format: isFormat(format) ? format : "esm",
    charset,
    entryURL,
    run,
    jsxFactory,
    jsxFragment,
    reload,
    sourcemap,
  };
}
