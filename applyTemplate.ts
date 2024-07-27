import { getUnixTime } from "https://esm.sh/v135/date-fns@3.4.0/getUnixTime.mjs";
import { fetch } from "./fetch.ts";

export const applyTemplate = async (
  code: string,
  entryPointURL: string,
  templateURL: string,
  reload?: boolean,
): Promise<string> => {
  const [res] = await fetch(new Request(templateURL), !reload);
  const template = await res.text();
  const splitted = code.split("\n");
  const lines = template.replaceAll("@URL@", entryPointURL).split("\n").flatMap(
    (line) =>
      line.replace(
        /^(\s*)@CODE@/,
        (_, space) => splitted.map((line) => `${space}${line}`).join("\n"),
      ).split("\n"),
  );
  const now = getUnixTime(new Date());
  const json = {
    pages: [{
      title: lines[0],
      created: now,
      updated: now,
      lines: lines.map((line) => ({
        text: line,
        created: now,
        updated: now,
      })),
    }],
  };

  return JSON.stringify(json);
};
