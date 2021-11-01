/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />
/** @jsx h */
/** @jsxFrag Fragment */
import {
  Fragment,
  h,
  render,
  useEffect,
  useMemo,
  useState,
} from "./deps/preact.tsx";
import { parseSearchParams } from "./parseParams.ts";
import { build, BundleOptions } from "./build.ts";

console.log("Hello, packup!");

const { runnow, ...initialOptions } = parseSearchParams(location.search);

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
  useEffect(() => {
    (async () => {
      const code = await build(props.options);
      console.log("Finish building:", code);
      const blob = new Blob([code], { type: "application/javascript" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_self");
      URL.revokeObjectURL(url);
    })();
  }, []);

  return (
    <>
      <p>Building...please wait.</p>
    </>
  );
};

const app = document.getElementById("app") as HTMLDivElement | null;
if (!app) throw Error("Could not find `#app`.");
render(
  runnow ? <HeadlessApp options={initialOptions} /> : <App />,
  app,
);
