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
  define: Record<string, string>;
  jsxFactory: string;
  jsxFragment: string;
  reload: boolean;
  sourcemap: false | "inline";
  importMapURL?: URL;
};
