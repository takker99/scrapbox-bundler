import { fetch } from "../fetch.ts";

const hostname = "deno.land";
export interface RedirectOption {
  reload: boolean;
}
export async function redirect(
  pathname: string,
  option?: RedirectOption,
): Promise<URL> {
  {
    const match = pathname.match(
      /^\/x\/([^\/@]+)(@[^\/]+)?(\/.*)?/,
    );
    if (match) {
      const name = match[1];
      const version = match[2]?.slice?.(1);
      const file = match[3] ?? "";
      return await resolve(
        "x",
        name,
        version,
        file,
        option ?? { reload: false },
      );
    }
  }
  const match = pathname.match(
    /^\/std(@[^\/]+)?\/([^\/@]+)(\/.*)?/,
  );
  if (!match) throw URIError(`"${pathname}" is an invalid deno.land pathname`);
  const name = match[2];
  const version = match[1]?.slice?.(1);
  const file = match[3] ?? "";
  return await resolve("std", name, version, file, option ?? { reload: false });
}

async function resolve(
  type: Package,
  name: string,
  version: string | undefined,
  file: string,
  { reload }: RedirectOption,
): Promise<URL> {
  if (version !== undefined) {
    return new URL(
      `https://${hostname}/${
        type === "x" ? `x/${name}@${version}` : `std@${version}/${name}`
      }${file}`,
    );
  }

  const { response } = await fetch(
    `https://cdn.deno.land/${type === "x" ? name : "std"}/meta/versions.json`,
    reload,
  );
  if (!response.ok) {
    throw { status: response.status, statusText: response.statusText };
  }
  const { latest } = (await response.json()) as Versions;
  console.info(
    `use ${
      type === "x" ? `x/${name}@${latest}` : `std@${latest}/${name}`
    } as the latest version of ${type}/${name}`,
  );
  return await resolve(type, name, latest, file, { reload });
}

interface Versions {
  latest: string;
  versions: string[];
}

type Package = "x" | "std";
