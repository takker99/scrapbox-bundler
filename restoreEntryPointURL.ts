import { extname } from "@std/path/posix/extname";

export const restoreEntryPointURL = (path: string): string => {
  const [protocol, rest] = path.slice(1).split(":", 2);

  const tempURL = new URL(`${protocol}:/${rest}`);
  tempURL.search = "";
  tempURL.hash = "";
  const pathname = tempURL.pathname.slice(0, -extname(tempURL.href).length);
  return decodeURIComponent(new URL(pathname, tempURL.origin).href);
};
