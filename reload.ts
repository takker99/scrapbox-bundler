import { isBoolean } from "@core/unknownutil/is/boolean";
import "./deps/urlpattern-polyfill.ts";
export type Reload = true | URLPattern[];

export const preferReload = (url: URL, patterns: Reload): boolean =>
  isBoolean(patterns) || patterns.some((pattern) => pattern.test(url));
