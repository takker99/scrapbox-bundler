import type { BuildFailure } from "./deps/esbuild-wasm.ts";

export type FetchErrorInfo = {
  type: "fetch error";
  url: string;
  data: {
    status: number;
    statusText: string;
  };
};
export type RemoteInfo = {
  url: string;
  type: "remote";
};
export type CacheInfo = {
  url: string;
  type: "cache";
};
export type ImportInfo = RemoteInfo | CacheInfo | FetchErrorInfo;

export type BuiltInfo = {
  type: "built";
  code: Uint8Array;
};
export type BuildErrorInfo = {
  type: "build error";
  data: BuildFailure;
};
export type UnexpectedErrorInfo = {
  type: "unexpected error";
  data: unknown;
};
export type BuildResult =
  | ImportInfo
  | BuiltInfo
  | BuildErrorInfo
  | UnexpectedErrorInfo;
export type ErrorInfo = FetchErrorInfo | BuildErrorInfo | UnexpectedErrorInfo;

const formatList = ["esm", "iife", "cjs"] as const;
export type Format = (typeof formatList)[number];
export function isFormat(format: string): format is Format {
  return (formatList as [string, string, string]).includes(format);
}
export type BundleOptions = {
  bundle: boolean;
  minify: boolean;
  charset?: "utf8";
  format: Format;
  entryURL: string;
  external: string[];
  jsxFactory: string;
  jsxFragment: string;
  reload: boolean;
  sourcemap: false | "inline";
  importmap?: string;
};
