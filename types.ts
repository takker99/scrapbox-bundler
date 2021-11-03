export type ErrorInfo = {
  type: "error";
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
export type ImportInfo = RemoteInfo | CacheInfo | ErrorInfo;

export type BuiltInfo = {
  type: "built";
  code: Uint8Array;
};
export type UnexpectedErrorInfo = {
  type: "unexpected";
  data: unknown;
};
export type BuildResult = ImportInfo | BuiltInfo | UnexpectedErrorInfo;

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
  jsxFactory: string;
  jsxFragment: string;
};
