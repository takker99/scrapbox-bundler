const loaderList = [
  "js",
  "jsx",
  "ts",
  "tsx",
  "css",
  "json",
  "text",
  "base64",
  "file",
  "dataurl",
  "binary",
  "default",
] as const;
export type Loader = (typeof loaderList)[number];
function isLoader(loader: string): loader is Loader {
  return (loaderList as [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ]).includes(loader);
}
export function getLoader(response: Response): Loader {
  const url = response.url;
  const ext = url.split(".").pop();
  if (ext && isLoader(ext)) return ext;
  if (ext === "mjs") return "js";
  const contentType = response.headers.get("Content-Type") ?? "text/plain";
  const mimeType = contentType.split(";")[0]?.trim?.() ?? "text/plain";
  return mimeTypeToLoader(mimeType);
}

export function mimeTypeToLoader(mimeType: string): Loader {
  const subType = mimeType.split("/")[1] ?? "plain";
  if (/(?:^plain$|^xml|^svg|^x?html)/.test(subType)) {
    return "text";
  }
  if (subType.startsWith("json")) {
    return "json";
  }
  switch (subType) {
    case "javascript":
      return "js";
    case "typescript":
      return "ts";
    case "css":
      return "css";
    default:
      return "text";
  }
}
