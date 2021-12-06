// Modified https://deno.land/std@0.114.0/path/posix.ts in order to use web browsers

/**
 * Return the relative path from `from` to `to`
 * @param from path in current working directory
 * @param to path in current working directory
 */
export function relative(from: URL, to: URL): string {
  if (from === to) return "./";
  // http://の部分が違ったらそもそも相対パスにできない
  if (from.protocol !== to.protocol) return to.toString();
  if (from.hostname !== to.hostname) return `//${to.hostname}${to.pathname}`;

  const fromSegments = from.pathname.split("/");
  // Compare paths to find the longest common path from root
  const toSegments = to.pathname.split("/");
  let commonLength = 1;
  const minLength = Math.min(fromSegments.length, toSegments.length);
  for (
    ;
    commonLength < minLength;
  ) {
    if (fromSegments[commonLength] !== toSegments[commonLength]) {
      break;
    }
    commonLength++;
  }
  if (commonLength === 1) {
    return to.pathname;
  }
  const deleteSegLength = fromSegments.length - commonLength;
  const prefix = deleteSegLength == 0
    ? `./${fromSegments[fromSegments.length - 1]}/`
    : deleteSegLength === 1
    ? "./"
    : "../".repeat(deleteSegLength - 1);
  return `${prefix}${toSegments.slice(commonLength).join("/")}`;
}
