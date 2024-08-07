/// <reference lib="deno.ns" />

import { parseDefine } from "./parseParams.ts";
import { assertEquals } from "./deps/testing.ts";

Deno.test("parseDefine", () => {
  assertEquals(parseDefine([]), {});
  assertEquals(parseDefine(["invalid string"]), {});
  assertEquals(parseDefine(["magic_number:3443"]), { magic_number: "3443" });
  assertEquals(parseDefine(["invalid string", "magic_number:3443"]), {
    magic_number: "3443",
  });
  assertEquals(
    parseDefine([
      "magic_number:3443",
      "AUTH_TOKEN:ser43e8fh",
      "URL:https://example.com",
    ]),
    {
      magic_number: "3443",
      AUTH_TOKEN: "ser43e8fh",
      URL: "https://example.com",
    },
  );
  assertEquals(
    parseDefine([
      "invalid string",
      "magic_number:3443",
      "AUTH_TOKEN:ser43e8fh",
      "URL:https://example.com",
    ]),
    {
      magic_number: "3443",
      AUTH_TOKEN: "ser43e8fh",
      URL: "https://example.com",
    },
  );
});
Deno.test("parseDefine: the same keys are overwritten", () => {
  assertEquals(parseDefine(["magic_number:3443", "magic_number:5464"]), {
    magic_number: "5464",
  });
});
