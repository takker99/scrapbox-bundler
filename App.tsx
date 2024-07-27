/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />
/** @jsx h */
/** @jsxFrag Fragment */
import {
  Fragment,
  FunctionComponent,
  h,
  render,
  useEffect,
  useState,
} from "./deps/preact.tsx";
import { parseSearchParams } from "./parseParams.ts";
import { build } from "./build.ts";
import { BundleOptions } from "./types.ts";
import { loaderToMimeType } from "./loaderToMimeType.ts";
import { initialize, Loader } from "./deps/esbuild-wasm.ts";
import { fetch } from "./fetch.ts";

const { output, templateURL, ...initialOptions } = parseSearchParams(
  location.search,
);

await initialize({
  workerURL: "./worker.js",
  wasmModule: await WebAssembly.compileStreaming(
    (await fetch(new Request("./esbuild.wasm"), !initialOptions.reload))[0],
  ),
});

interface AppProp {
  options: BundleOptions;
  output: typeof output;
  templateURL?: string;
}

const App: FunctionComponent<AppProp> = ({ options, output, templateURL }) => {
  const [state, setState] = useState<"building" | "done" | "error">("building");

  useEffect(() => {
    (async () => {
      const { entryURL, ...params } = options;
      const entryPoints = [entryURL];
      const loaderMap = new Map<string, Loader>();
      try {
        const result = await build({
          entryPoints,
          ...params,
          progressCallback: (message) => {
            if (message.type === "resolve") return;
            message.done.then(({ loader }) =>
              loaderMap.set(message.path, loader)
            );
          },
        });
        const file = result.outputFiles[0];
        const loader = loaderMap.get(file.path) ?? "text";
        setState("done");
        const url = loader === "dataurl" ? file.text : URL.createObjectURL(
          await makeBlob(
            file.contents,
            loaderToMimeType(loader),
            decodeURI(location.href),
            templateURL,
          ),
        );
        switch (output) {
          case "newtab":
          case "self": {
            globalThis.open(
              url,
              output === "self" ? "_self" : undefined,
            );
            break;
          }
          case "download": {
            const a = document.createElement("a");
            a.href = url;
            a.download = templateURL ? "import.json" : `index.${loader}`;
            a.style.display = "none";
            a.click();
            a.remove();
            break;
          }
        }
        if (loader !== "dataurl") URL.revokeObjectURL(url);
      } catch (e) {
        setState("error");
        console.error(e);
      }
    })();
  }, []);

  return (
    <>
      <p>
        {state === "building"
          ? <>{Spinner}{"Building...please wait."}</>
          : state === "done"
          ? <>{CheckCircle}{"Finish building."}</>
          : <>{TimesCircle}{"Failed to build."}</>}
      </p>
    </>
  );
};

const Spinner = <i className="fas fa-spinner" />;
const CheckCircle = <i className="far fa-check-circle" />;
const TimesCircle = <i className="far fa-times-circle" />;

const makeBlob = async (
  code: Uint8Array,
  mimeType: string,
  entryPointURL: string,
  templateURL?: string,
) => {
  if (!templateURL) {
    const blob = new Blob([code], { type: mimeType });
    return blob;
  }
  const [res] = await fetch(new Request(templateURL), !initialOptions.reload);
  const template = await res.text();
  const sourceCode = new TextDecoder().decode(code);
  const lines = template.replaceAll("@URL@", entryPointURL).split("\n").flatMap(
    (line) => {
      const text = line.replace(
        /^(\s*)@CODE@/,
        (_, space) =>
          sourceCode.split(/\n/).map((line) => `${space}${line}`).join("\n"),
      );
      return text.split("\n");
    },
  );
  const now = new Date().getTime() / 1000;
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

  return new Blob([JSON.stringify(json)], {
    type: "application/json;charset=UTF-8",
  });
};

const app = document.getElementById("app") as HTMLDivElement | null;
if (!app) throw Error("Could not find `#app`.");
render(
  <App
    options={initialOptions}
    output={output}
    templateURL={templateURL}
  />,
  app,
);
