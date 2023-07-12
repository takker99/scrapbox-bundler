import { relative } from "./path.ts";
import { assertEquals } from "./deps/testing.ts";

Deno.test("relative()", async (t) => {
  await t.step("no changes", () => {
    const testData: [URL, URL, string][] = [
      [
        new URL("https://scrapbox.io/api/code/project/page/script.js"),
        new URL("http://example.com"),
        "http://example.com/",
      ],
      [
        new URL("https://scrapbox.io/api/code/project/page/script.js"),
        new URL("http://example.com/about"),
        "http://example.com/about",
      ],
      [
        new URL("https://scrapbox.io/api/code/project/page/script.js"),
        new URL("http://example.com/about?username=hogehoge"),
        "http://example.com/about?username=hogehoge",
      ],
      [
        new URL("https://scrapbox.io/api/code/project/page/script.js"),
        new URL("http://example.com/about#id-3"),
        "http://example.com/about#id-3",
      ],
      [
        new URL("https://scrapbox.io/api/code/project/page/script.js"),
        new URL("http://example.com/about?pass=fuga&username=hoge#id-3"),
        "http://example.com/about?pass=fuga&username=hoge#id-3",
      ],
    ];
    testData.forEach(([base, target, relativeURL]) => {
      assertEquals(relative(base, target), relativeURL);
      assertEquals(new URL(relativeURL, base), target);
    });
  });

  await t.step("the same protocol", () => {
    const testData: [URL, URL, string][] = [
      [
        new URL("https://scrapbox.io/api/code/project/page/script.js"),
        new URL("https://example.com"),
        "//example.com/",
      ],
      [
        new URL("https://scrapbox.io/api/code/project/page/script.js"),
        new URL("https://example.com/about"),
        "//example.com/about",
      ],
      [
        new URL("https://scrapbox.io/api/code/project/page/script.js"),
        new URL("https://example.com/about?username=hogehoge"),
        "//example.com/about?username=hogehoge",
      ],
      [
        new URL("https://scrapbox.io/api/code/project/page/script.js"),
        new URL("https://example.com/about#id-3"),
        "//example.com/about#id-3",
      ],
      [
        new URL("https://scrapbox.io/api/code/project/page/script.js"),
        new URL("https://example.com/about?pass=fuga&username=hoge#id-3"),
        "//example.com/about?pass=fuga&username=hoge#id-3",
      ],
    ];
    testData.forEach(([base, target, relativeURL]) => {
      assertEquals(relative(base, target), relativeURL);
      assertEquals(new URL(relativeURL, base), target);
    });
  });

  await t.step("the same hostname", () => {
    const testData: [URL, URL, string][] = [
      [
        new URL("https://esm.sh/date-fns"),
        new URL("https://esm.sh/preact/hooks"),
        "/preact/hooks",
      ],
      [
        new URL("https://esm.sh/date-fns"),
        new URL("https://esm.sh/preact/hooks?username=hoge"),
        "/preact/hooks?username=hoge",
      ],
      [
        new URL("https://esm.sh/date-fns"),
        new URL("https://esm.sh/preact/hooks#main"),
        "/preact/hooks#main",
      ],
      [
        new URL("https://esm.sh/date-fns"),
        new URL("https://esm.sh/preact/hooks?username=huga&sss#main"),
        "/preact/hooks?username=huga&sss#main",
      ],
    ];
    testData.forEach(([base, target, relativeURL]) => {
      assertEquals(relative(base, target), relativeURL);
      assertEquals(new URL(relativeURL, base), target);
    });
  });

  await t.step("relative", async (t) => {
    await t.step("depth 0", () => {
      const testData: [URL, URL, string][] = [
        [
          new URL("https://scrapbox.io/api/code/project/page/script.js"),
          new URL("https://scrapbox.io/api/code/project/page/script.js"),
          "./script.js",
        ],
        [
          new URL("https://scrapbox.io/api/code/project/page/script.js"),
          new URL(
            "https://scrapbox.io/api/code/project/page/script.js?username=hoge&fff",
          ),
          "./script.js?username=hoge&fff",
        ],
        [
          new URL("https://scrapbox.io/api/code/project/page/script.js"),
          new URL(
            "https://scrapbox.io/api/code/project/page/script.js#main",
          ),
          "./script.js#main",
        ],
        [
          new URL("https://scrapbox.io/api/code/project/page/script.js"),
          new URL(
            "https://scrapbox.io/api/code/project/page/script.js?username=hoge&fff#main",
          ),
          "./script.js?username=hoge&fff#main",
        ],
        [
          new URL("https://scrapbox.io/api/code/project/"),
          new URL("https://scrapbox.io/api/code/project/page/script.js"),
          "./page/script.js",
        ],
        [
          new URL("https://scrapbox.io/api/code/project/"),
          new URL(
            "https://scrapbox.io/api/code/project/page/script.js?username=hoge&fff",
          ),
          "./page/script.js?username=hoge&fff",
        ],
        [
          new URL("https://scrapbox.io/api/code/project/"),
          new URL(
            "https://scrapbox.io/api/code/project/page/script.js#main",
          ),
          "./page/script.js#main",
        ],
        [
          new URL("https://scrapbox.io/api/code/project/"),
          new URL(
            "https://scrapbox.io/api/code/project/page/script.js?username=hoge&fff#main",
          ),
          "./page/script.js?username=hoge&fff#main",
        ],
      ];
      testData.forEach(([base, target, relativeURL]) => {
        assertEquals(relative(base, target), relativeURL);
        assertEquals(new URL(relativeURL, base), target);
      });
    });

    await t.step("depth 1", () => {
      const testData: [URL, URL, string][] = [
        [
          new URL("https://scrapbox.io/api/code/project/page/script.js"),
          new URL("https://scrapbox.io/api/code/project/page/mod.js"),
          "./mod.js",
        ],
        [
          new URL("https://scrapbox.io/api/code/project/page/script.js"),
          new URL(
            "https://scrapbox.io/api/code/project/page/mod.js?username=hoge&fff",
          ),
          "./mod.js?username=hoge&fff",
        ],
        [
          new URL("https://scrapbox.io/api/code/project/page/script.js"),
          new URL("https://scrapbox.io/api/code/project/page/mod.js#main"),
          "./mod.js#main",
        ],
        [
          new URL("https://scrapbox.io/api/code/project/page/script.js"),
          new URL(
            "https://scrapbox.io/api/code/project/page/mod.js?username=hoge&fff#main",
          ),
          "./mod.js?username=hoge&fff#main",
        ],
      ];
      testData.forEach(([base, target, relativeURL]) => {
        assertEquals(relative(base, target), relativeURL);
        assertEquals(new URL(relativeURL, base), target);
      });
    });

    await t.step("depth 2", () => {
      const testData: [URL, URL, string][] = [
        [
          new URL("https://scrapbox.io/api/code/project/page/script.js"),
          new URL("https://scrapbox.io/api/code/project2/page/mod.js"),
          "../../project2/page/mod.js",
        ],
        [
          new URL("https://scrapbox.io/api/code/project/page/script.js"),
          new URL(
            "https://scrapbox.io/api/code/project2/page/mod.js?username=hoge&fff",
          ),
          "../../project2/page/mod.js?username=hoge&fff",
        ],
        [
          new URL("https://scrapbox.io/api/code/project/page/script.js"),
          new URL("https://scrapbox.io/api/code/project2/page/mod.js#main"),
          "../../project2/page/mod.js#main",
        ],
        [
          new URL("https://scrapbox.io/api/code/project/page/script.js"),
          new URL(
            "https://scrapbox.io/api/code/project/page/mod.js?username=hoge&fff#main",
          ),
          "./mod.js?username=hoge&fff#main",
        ],
      ];
      testData.forEach(([base, target, relativeURL]) => {
        assertEquals(relative(base, target), relativeURL);
        assertEquals(new URL(relativeURL, base), target);
      });
    });
  });
});
