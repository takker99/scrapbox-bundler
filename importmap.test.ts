/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="deno.ns"/>
import { ensureImportMap } from "./importmap.ts";
import { assertThrows } from "./deps/testing.ts";

Deno.test("ensureImportMap()", () => {
  assertThrows(() => ensureImportMap({}));
  assertThrows(() => {
    ensureImportMap({ imports: 32 });
    ensureImportMap({ imports: {}, scopes: 34 });
    ensureImportMap({ scopes: {} });
  });
  assertThrows(() => {
    ensureImportMap({ imports: { "preact": 34 } });
    ensureImportMap({
      imports: { "preact": "https://esm.sh/preact", "lodash": {} },
    });
  });
  assertThrows(() => {
    ensureImportMap({
      imports: { "preact": "https://esm.sh/preact" },
      scopes: {
        test: 34,
      },
    });
    ensureImportMap({
      imports: { "preact": "https://esm.sh/preact" },
      scopes: {
        test: {
          lodash: 23,
        },
      },
    });
    ensureImportMap({
      imports: { "preact": "https://esm.sh/preact" },
      scopes: {
        test: {
          lodash: "https:esm.sh/lodash",
          moment: 45,
        },
      },
    });
    ensureImportMap({
      imports: { "preact": "https://esm.sh/preact" },
      scopes: {
        test: {
          lodash: "https:esm.sh/lodash",
          moment: "https://esm.sh/moment",
        },
        scope: 54,
      },
    });
    ensureImportMap({
      imports: { "preact": "https://esm.sh/preact" },
      scopes: {
        test: {
          lodash: "https:esm.sh/lodash",
          moment: "https://esm.sh/moment",
        },
        scope: {
          lodash: "https:esm.sh/lodash",
          test: {},
        },
      },
    });
  });
});
