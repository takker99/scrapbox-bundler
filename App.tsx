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
  useCallback,
  useEffect,
  useState,
} from "./deps/preact.tsx";
import { parseSearchParams } from "./parseParams.ts";
import { build } from "./build.ts";
import {
  BuildOptions,
  initialize,
  Loader,
  Metafile,
} from "./deps/esbuild-wasm.ts";
import { fetch } from "./fetch.ts";
import { ChartPie, CheckCircle, Spinner, TimesCircle } from "./Icons.tsx";
import { BuildResult } from "./BuildResult.tsx";
import { applyTemplate } from "./applyTemplate.ts";
import { restoreEntryPointURL } from "./restoreEntryPointURL.ts";
import { extname, mimeType } from "./loader.ts";

const { templateURL, ...initialOptions } = parseSearchParams(
  location.search,
);

await initialize({
  workerURL: "./worker.js",
  wasmModule: await WebAssembly.compileStreaming(
    (await fetch(new Request("./esbuild.wasm"), !initialOptions.reload))[0],
  ),
});

export interface BundleOptions extends
  Pick<
    BuildOptions,
    | "bundle"
    | "minify"
    | "format"
    | "charset"
    | "external"
    | "define"
    | "jsx"
    | "jsxDev"
    | "jsxFactory"
    | "jsxFragment"
    | "jsxImportSource"
    | "jsxSideEffects"
    | "supported"
    | "target"
    | "sourcemap"
    | "keepNames"
  > {
  reload: boolean;
  entryPoints: string[];
  importMapURL?: URL;
}

interface AppProp {
  options: BundleOptions;
  templateURL?: URL;
}

const App: FunctionComponent<AppProp> = ({ options, templateURL }) => {
  const [state, setState] = useState<State>({ type: "building" });

  useEffect(() => {
    (async () => {
      const { entryPoints, ...params } = options;
      const loaderMap = new Map<string, Loader>();
      try {
        const result = await build({
          entryPoints: entryPoints.map((url) => ({ in: url, out: url })),
          ...params,
          outdir: "./",
          progressCallback: (message) => {
            if (message.type === "resolve") return;
            message.done.then(({ loader }) =>
              loaderMap.set(message.path, loader)
            );
          },
        });
        const files = new Map(result.outputFiles.map((file) => {
          const url = restoreEntryPointURL(file.path);
          const loader = loaderMap.get(url.href) ?? "text";
          const ext = extname(loader);
          const fileName = url.href.endsWith(ext)
            ? url.href
            : `${url.href}#${ext}`;

          return [
            url.href,
            new File([file.contents], fileName, { type: mimeType(loader) }),
          ];
        }));

        if (!templateURL) {
          setState({
            type: "done",
            files: [...files.values()],
            metafile: result.metafile,
          });
          return;
        }
        const data = await applyTemplate(
          files,
          location,
          templateURL,
          initialOptions.reload,
        );
        setState({
          type: "done",
          files: [
            new File([JSON.stringify(data)], data.pages[0].title, {
              type: "application/json",
            }),
          ],
          metafile: result.metafile,
        });
      } catch (error: unknown) {
        console.error(error);
        setState({ type: "error", error });
      }
    })();
  }, [templateURL, ...Object.values(options)]);

  return (
    <>
      <p>
        {state.type === "building"
          ? <>{Spinner}{" Building...please wait."}</>
          : state.type === "done"
          ? <>{CheckCircle}{" Finish building."}</>
          : <>{TimesCircle}{" Failed to build."}</>}
      </p>
      {state.type === "done" &&
        (
          <>
            <p>
              <MetafileButton metafile={state.metafile} />{" "}
              You can visulaize the metafile with{" "}
              <a
                href="https://esbuild.github.io/analyze"
                target="_blank"
                rel="noopener noreferrer"
              >
                esbuild Bundle Size Analyzer
              </a>
            </p>
            {state.files.map((file) => <BuildResult file={file} />)}
          </>
        )}
    </>
  );
};

interface Building {
  type: "building";
}
interface Built {
  type: "done";
  files: File[];
  metafile: Metafile;
}
interface Failed {
  type: "error";
  error: unknown;
}

type State = Building | Built | Failed;

const app = document.getElementById("app") as HTMLDivElement | null;
if (!app) throw Error("Could not find `#app`.");
render(
  <App
    options={initialOptions}
    templateURL={templateURL}
  />,
  app,
);

const MetafileButton: FunctionComponent<{
  metafile: Metafile;
}> = ({ metafile }) => {
  const download = useCallback(() => {
    const blob = new Blob([JSON.stringify(metafile)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "metafile.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [metafile]);

  return (
    <button className="metafile" onClick={download} title="download metafile">
      {ChartPie}
      {" Download Metafile"}
    </button>
  );
};
