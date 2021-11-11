import { relative } from "./path.ts";
import { assertEquals } from "./deps/testing.ts";

Deno.test("relative()", () => {
  const testData: [URL, URL, string][] = [
    [
      new URL("https://scrapbox.io/api/code/project/page/script.js"),
      new URL("https://scrapbox.io/api/code/project/page/mod.js"),
      "./mod.js",
    ],
    [
      new URL("https://scrapbox.io/api/code/project/page/script.js"),
      new URL("https://scrapbox.io/api/code/project/page2/mod.js"),
      "../page2/mod.js",
    ],
    [
      new URL("https://scrapbox.io/api/code/project/page/script.js"),
      new URL("https://scrapbox.io/api/code/project2/page/mod.js"),
      "../../project2/page/mod.js",
    ],
    [
      new URL("https://scrapbox.io/api/code/project/page/script.js"),
      new URL("https://esm.sh/preact"),
      "//esm.sh/preact",
    ],
    [
      new URL("https://esm.sh/date-fns"),
      new URL("https://esm.sh/preact/hooks"),
      "/preact/hooks",
    ],
  ];
  testData.forEach(([base, target, relativeURL]) => {
    assertEquals(relative(base, target), relativeURL);
    assertEquals(new URL(relativeURL, base), target);
  });
});
