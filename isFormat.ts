import { Format } from "@takker/esbuild-wasm-no-blob";

const formats: Format[] = ["esm", "iife", "cjs"] as const;
export const isFormat = (format: string): format is Format =>
  (formats as string[]).includes(format);
