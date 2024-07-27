import { Format } from "./deps/esbuild-wasm.ts";

const formats: Format[] = ["esm", "iife", "cjs"] as const;
export const isFormat = (format: string): format is Format =>
  (formats as string[]).includes(format);
