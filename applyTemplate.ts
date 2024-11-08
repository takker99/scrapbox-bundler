import { getUnixTime } from "date-fns/getUnixTime";
import { fetch } from "./fetch.ts";
import { ImportedData } from "@cosense/types/rest";
import { escape } from "@std/regexp";
import { createOk, isErr, Result, unwrapOk } from "option-t/plain_result";
import { AbortError, HTTPError, NetworkError } from "./deps/remoteLoader.ts";
import { preferReload, Reload } from "./reload.ts";

export const applyTemplate = async (
  files: Map<string, Blob>,
  buildURL: Location,
  templateURL: URL,
  reload: Reload,
): Promise<
  Result<ImportedData<true>, NetworkError | AbortError | HTTPError>
> => {
  const result = await fetch(
    new Request(templateURL),
    !preferReload(templateURL, reload),
  );
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
