import { getUnixTime } from "https://esm.sh/v135/date-fns@3.4.0/getUnixTime.mjs";
import { fetch } from "./fetch.ts";
import { ImportedData } from "./deps/scrapbox.ts";
import { escape } from "./deps/regexp.ts";
import { createOk, isErr, Result, unwrapOk } from "./deps/option-t.ts";
import { AbortError, HTTPError, NetworkError } from "./deps/remoteLoader.ts";

export const applyTemplate = async (
  files: Map<string, Blob>,
  buildURL: Location,
  templateURL: URL,
  reload?: boolean,
): Promise<
  Result<ImportedData<true>, NetworkError | AbortError | HTTPError>
> => {
  const result = await fetch(new Request(templateURL), !reload);
  if (isErr(result)) return result;
  const [res] = unwrapOk(result);
  const template = await res.text();
  let replaced = template.replaceAll("@URL@", buildURL.href);
  let first = true;
  for (const [path, blob] of files) {
    const splitted = (await blob.text()).split("\n");
    const regExp = new RegExp(
      // 後方互換性のため、最初のパスだけCODEにもマッチさせる
      `^(\\s*)@${first ? `(?:${escape(path)}|CODE)` : escape(path)}@$`,
      "gmu",
    );
    first = false;
    replaced = replaced.replace(
      regExp,
      (_, space) => splitted.map((line) => `${space}${line}`).join("\n"),
    );
  }
  const lines = replaced.split("\n");
  const now = getUnixTime(new Date());
  return createOk({
    pages: [{
      title: lines[0],
      lines: lines.map((line) => ({
        text: line,
        created: now,
        updated: now,
      })),
    }],
  });
};
