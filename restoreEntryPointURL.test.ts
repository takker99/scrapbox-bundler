import { assertEquals } from "@std/assert/equals";
import { restoreEntryPointURL } from "./restoreEntryPointURL.ts";

Deno.test("restoreEntryPointURL strips output extension", () => {
  assertEquals(
    restoreEntryPointURL("/https:/example.com/path/module.ts.js"),
    "https://example.com/path/module.ts",
  );
});

Deno.test("restoreEntryPointURL preserves encoded slash", () => {
  assertEquals(
    restoreEntryPointURL(
      "/https:/scrapbox.io/api/code/takker/@takker%2FScrapJupyter/mod.ts.js",
    ),
    "https://scrapbox.io/api/code/takker/@takker%2FScrapJupyter/mod.ts",
  );
});
