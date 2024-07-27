import { getUnixTime } from "https://esm.sh/v135/date-fns@3.4.0/getUnixTime.mjs";
import { fetch } from "./fetch.ts";
import { ImportedData } from "./deps/scrapbox.ts";
import { escape } from "./deps/regexp.ts";

export const applyTemplate = async (
  files: Map<string, Blob>,
  buildURL: Location,
  templateURL: URL,
  reload?: boolean,
): Promise<ImportedData<true>> => {
  const [res] = await fetch(new Request(templateURL), !reload);
  const template = await res.text();
  let replaced = template.replaceAll("@URL@", buildURL.href);
  for (const [path, blob] of files) {
    const splitted = (await blob.text()).split("\n");
    const regExp = new RegExp(`^(\\s*)@${escape(path)}@$`, "gmu");
    replaced = replaced.replace(
      regExp,
      (_, space) => splitted.map((line) => `${space}${line}`).join("\n"),
    );
  }
  const lines = replaced.split("\n");
  const now = getUnixTime(new Date());
  return {
    pages: [{
      title: lines[0],
      lines: lines.map((line) => ({
        text: line,
        created: now,
        updated: now,
      })),
    }],
  };
};
