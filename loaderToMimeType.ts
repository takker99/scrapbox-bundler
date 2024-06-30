import { Loader } from "./deps/esbuild-wasm.ts";

export const loaderToMimeType = (loader: Loader): string => {
  switch (loader) {
    case "css":
    case "local-css":
    case "text":
      return "text/css";
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
