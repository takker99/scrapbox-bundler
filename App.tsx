/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />
/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, render, useEffect, useState } from "./deps/preact.tsx";
import { parseSearchParams } from "./parseParams.ts";
import { build } from "./build.ts";
import type { BundleOptions, ErrorInfo, UnexpectedErrorInfo } from "./types.ts";

const { run, ...initialOptions } = parseSearchParams(location.search);

const App = () => {
  return (
    <>
      <header>
        <h1>Scrapbox Bundler</h1>
      </header>
      <section>
        <h2>Options</h2>
        <p>
          target URL
          <input type="text" name="target-url" pattern="^https?:\/\/" />
        </p>
        <p>
          bundle
          <input type="checkbox" name="bundle" value="true" checked />
        </p>
        <p>
          minify
          <input type="checkbox" name="minify" value="true" checked />
        </p>
        <p>
          format
          <input type="radio" name="format" value="esm" checked>
            ES Module
          </input>
          <input type="radio" name="format" value="iife">
            immediately-invoked function expression
          </input>
          <input type="radio" name="format" value="commonjs">CommonJS</input>
        </p>
        <p>
          include source map
          <input type="checkbox" name="source-map" value="true" />
        </p>
        <p>
          <p>
            URLs which are excluded from your build
          </p>
          <textarea />
        </p>
        <p>
          <p>
            import map
          </p>
          <textarea />
        </p>
      </section>
      <section>
        <h2>Advanced Options</h2>
        <p>
          escape non-ASCII characters
          <input
            type="checkbox"
            name="charset"
            value="utf8"
            checked
          />
        </p>
      </section>
      <h2>Results</h2>
      <div id="main"></div>
    </>
  );
};

const HeadlessApp = (props: { options: BundleOptions }) => {
  const [log, setLog] = useState<string>("");
  useEffect(() => {
    (async () => {
      console.group("build log");
      try {
        for await (const data of build(props.options)) {
          console.log(data);
          switch (data.type) {
            case "built": {
              setLog((old) => `${old}\nFinish building.`);
              const blob = new Blob([data.code], {
                type: "application/javascript;charset=UTF-8",
              });
              const url = URL.createObjectURL(blob);
              window.open(url, "_self");
              URL.revokeObjectURL(url);
              break;
            }
            case "remote":
              setLog((old) => `${old}\nDownload ${decodeURI(data.url)}`);
              break;
            case "cache":
              setLog((old) => `${old}\nUse cache: ${decodeURI(data.url)}`);
              break;
            case "skip":
              setLog((old) => `${old}\nPreserve ${decodeURI(data.url)}`);
              break;
            case "fetch error":
              setLog((old) =>
                `${old}\nNetwork Error: ${data.data.status} ${data.data.statusText}\n\tat ${
                  decodeURI(data.url)
                }: `
              );
              break;
            case "build error":
              setLog((old) =>
                [
                  old,
                  ...data.data.errors.map((
                    { location, pluginName, text },
                  ) =>
                    `[${
                      pluginName || "esbuild"
                    }]Build error: ${text} \n\tat ${location
                      ?.file}\n\t${location
                      ?.lineText}\n\t${location?.suggestion}`
                  ),
                  ...data.data.warnings.map((
                    { location, pluginName, text },
                  ) =>
                    `[${
                      pluginName || "esbuild"
                    }]Build warning: ${text} \n\tat ${location
                      ?.file}\n\t${location
                      ?.lineText}\n\t${location?.suggestion}`
                  ),
                ].join("\n")
              );
              break;
          }
        }
      } catch (e) {
        if (e?.type !== "unexpected error") throw e;
        const error = e as UnexpectedErrorInfo;
        setLog((old) =>
          `${old}\nUnexpected Error: ${JSON.stringify(error.data)}`
        );
      }
      console.groupEnd();
    })();
  }, []);

  return (
    <>
      <p>Building...please wait.</p>
      <pre>
        <code>{log}</code>
      </pre>
    </>
  );
};

const app = document.getElementById("app") as HTMLDivElement | null;
if (!app) throw Error("Could not find `#app`.");
render(
  run ? <HeadlessApp options={initialOptions} /> : <App />,
  app,
);
