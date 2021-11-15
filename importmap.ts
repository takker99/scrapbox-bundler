import { fetch } from "./fetch.ts";
import type { ImportMap } from "./deps/importmap.ts";
export type { ImportMap };

export async function fetchImportMap(url: URL | string, reload = false) {
  const { type, response } = await fetch(url, reload);
  const json = await response.json();
  ensureImportMap(json);
  return { type, json };
}

export function ensureImportMap(
  // deno-lint-ignore no-explicit-any
  json: any,
): asserts json is ImportMap {
  if (!("imports" in json)) {
    throw SyntaxError('import map must have "imports"');
  }
  if (!(json.imports instanceof Object)) {
    throw SyntaxError('"imports" must be Object');
  }
  if (Object.values(json.imports).some((value) => typeof value !== "string")) {
    throw SyntaxError('the value of properties in "imports" must be string');
  }
  if ("scopes" in json) {
    if (!(json.scopes instanceof Object)) {
      throw SyntaxError('"scopes" must be Object');
    }

    for (const value of Object.values(json.scopes)) {
      if (!(value instanceof Object)) {
        throw SyntaxError('the value of properties in "scopes" must be object');
      }
      if (Object.values(value).some((value2) => typeof value2 !== "string")) {
        throw SyntaxError(
          'the value of properties in any object in "scopes" must be string',
        );
      }
    }
  }
}
