import "./deps/urlpattern-polyfill.ts";
import { Reload } from "./reload.ts";
import { BundleOptions } from "./App.tsx";
import { isFormat } from "./isFormat.ts";
import { isBoolean } from "./deps/unknownutil.ts";

export interface ParamOptions extends BundleOptions {
  templateURL?: URL;
}

export const parseSearchParams = (searchParam: string): ParamOptions => {
  const param = searchParam === "" ? "" : searchParam.slice(1);
  const params = new URLSearchParams(param);
  const bundle = params.get("bundle") === null ? false : true;
  const minify = params.get("minify") === null ? false : true;
  const format = params.get("format") ?? "esm";
  const define = parseDefine(params.getAll("define"));
  const charset = params.get("noUtf8") === null ? "utf8" : undefined;
  const jsxFactory = params.get("jsx-factory") ?? "h";
  const jsxFragment = params.get("jsx-fragment") ?? "Fragment";
  const entryPoints = [
    ...params.getAll("entryPoints"),
    ...params.getAll("url"),
  ];
  const sourcemap = params.get("sourcemap") === null ? false : "inline";
  const external = params.getAll("external").map((url) =>
    // necessary because esbuild treats external as encoded URL
    encodeURI(url)
  );

  const reload = params.getAll("reload").reduce((acc, cur) => {
    if (cur === "" || isBoolean(acc)) return true;
    try {
      const pattern = new URLPattern(cur);
      return [...acc, pattern];
    } catch (e: unknown) {
      if (e instanceof TypeError) {
        alert(`"${cur}" is not a valid URL pattern`);
      }
      console.error(e);
      throw e;
    }
  }, [] as Reload);
  const importMapURL = params.get("importmap") ?? undefined;
  const templateURL = params.get("template") ?? undefined;

  if (entryPoints.length === 0) {
    alert("No entry points to build");
    throw new Error("No entry points to build");
  }

  return {
    entryPoints,
    bundle,
    minify,
    format: isFormat(format) ? format : "esm",
    charset,
    external,
    define,
    jsxFactory,
    jsxFragment,
    reload,
    sourcemap,
    importMapURL: importMapURL
      ? new URL(importMapURL, entryPoints[0])
      : undefined,
    templateURL: templateURL ? new URL(templateURL, entryPoints[0]) : undefined,
  };
};
export const parseDefine = (define: string[]): Record<string, string> => {
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
};
