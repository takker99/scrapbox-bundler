import { Loader } from "@takker/esbuild-wasm-no-blob";

export const mimeType = (loader: Loader): string => {
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
