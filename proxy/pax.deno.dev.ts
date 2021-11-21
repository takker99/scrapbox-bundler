// The following code is based on https://github.com/kawarimidoll/pax.deno.dev/raw/d1dcae1fcbe0a5f77c89b028ddfae92daf8df92a/utils.ts
function extract(path: string) {
  const match = path.match(/^\/([^\/]+)\/([^\/@]+)(@[^\/]+)?(\/.*)?/);
  if (!match) return [];

  const [, owner, repo, atTag, file] = match;
  return [
    owner,
    repo,
    atTag ? atTag.slice(1) : "master",
    file?.replace(/^\/|\/$/g, "") || "mod.ts",
  ];
}

export function proxy(pathname: string): URL {
  const [owner, repo, tag, file] = extract(pathname);

  if (!owner || !repo) {
    throw URIError("invalid pax.deno.dev URL");
  }

  const host = "https://raw.githubusercontent.com";
  const location = [host, owner, repo, tag, file].join("/");
  return new URL(location);
}
