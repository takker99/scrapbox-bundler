import type { Loader } from "@takker/esbuild-wasm-no-blob";

export const mimeType = (loader: Loader): string => {
  switch (loader) {
    case "css":
    case "local-css":
      return "text/css";
    case "text":
      return "text/plain";
    case "dataurl":
    case "base64":
    case "empty":
      return "text/plain";
    case "default":
    case "binary":
    case "copy":
    case "file":
      return "application/octet-stream";
    case "js":
      return "text/javascript";
    case "json":
      return "application/json";
    case "jsx":
      return "text/javascript";
    case "ts":
      return "application/typescript";
    case "tsx":
      return "application/typescript";
  }
};

export const extname = (loader: Loader): string => {
  switch (loader) {
    case "css":
    case "js":
    case "json":
    case "jsx":
    case "ts":
    case "tsx":
      return `.${loader}`;
    case "base64":
    case "binary":
    case "copy":
    case "dataurl":
    case "default":
    case "empty":
    case "file":
      return "";
    case "local-css":
      return ".css";
    case "text":
      return ".txt";
  }
};

export const loaderFromExtension = (
  extension: string,
): Loader | undefined => {
  switch (extension) {
    case ".css":
      return "css";
    case ".js":
    case ".mjs":
    case ".cjs":
      return "js";
    case ".jsx":
      return "jsx";
    case ".ts":
      return "ts";
    case ".tsx":
      return "tsx";
    case ".json":
    case ".map":
      return "json";
    case ".txt":
      return "text";
    default:
      return undefined;
  }
};
