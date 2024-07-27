import { extname } from "./deps/url.ts";

export const restoreEntryPointURL = (path: string): URL => {
  const [protocol, rest] = path.slice(1).split(":", 2);

  const tempURL = new URL(`${protocol}:/${rest}`);
  const pathname = tempURL.pathname.slice(0, -extname(tempURL).length);
  return new URL(pathname, tempURL.origin);
};
