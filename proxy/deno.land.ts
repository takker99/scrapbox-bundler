const hostname = "deno.land";
export async function proxy(pathname: string): Promise<URL> {
  {
    const match = pathname.match(
      /^\/x\/([^\/@]+)(@[^\/]+)?(\/.*)?/,
    );
    if (match) {
      const name = match[1];
      const version = match[2]?.slice?.(1);
      const file = match[3] ?? "";
      return await resolve("x", name, version, file);
    }
  }
  const match = pathname.match(
    /^\/std(@[^\/]+)?\/([^\/@]+)(\/.*)?/,
  );
  if (!match) throw URIError(`"${pathname}" is an invalid deno.land pathname`);
  const name = match[2];
  const version = match[1]?.slice?.(1);
  const file = match[3] ?? "";
  return await resolve("std", name, version, file);
}

async function resolve(
  type: Package,
  name: string,
  version: string | undefined,
  file: string,
): Promise<URL> {
  if (version !== undefined) {
    return new URL(
      `https://${hostname}/${
        type === "x" ? `x/${name}@${version}` : `std@${version}/${name}`
      }${file}`,
    );
  }

  const res = await fetch(
    `https://cdn.deno.land/${type === "x" ? name : "std"}/meta/versions.json`,
  );
  if (!res.ok) {
    throw { status: res.status, statusText: res.statusText };
  }
  const { latest } = (await res.json()) as Versions;
  console.info(
    `use ${
      type === "x" ? `x/${name}@${latest}` : `std@${latest}/${name}`
    } as the latest version of ${type}/${name}`,
  );
  return await resolve(type, name, latest, file);
}

interface Versions {
  latest: string;
  versions: string[];
}

type Package = "x" | "std";
