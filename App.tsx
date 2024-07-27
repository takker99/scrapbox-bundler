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
import { initialize, Loader } from "./deps/esbuild-wasm.ts";
import { fetch } from "./fetch.ts";
import { CheckCircle, Spinner, TimesCircle } from "./Icons.tsx";
import { BuildResult } from "./BuildResult.tsx";
import { applyTemplate } from "./applyTemplate.ts";

const { templateURL, ...initialOptions } = parseSearchParams(
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
  templateURL?: string;
}

const App: FunctionComponent<AppProp> = ({ options, templateURL }) => {
  const [state, setState] = useState<State>({ type: "building" });

  useEffect(() => {
    (async () => {
      const { entryURL, ...params } = options;
      const loaderMap = new Map<string, Loader>();
      try {
        const result = await build({
          entryPoints: [entryURL],
          ...params,
          outdir: "/",
          outbase: "https",
          sourceRoot: "./",
          progressCallback: (message) => {
            if (message.type === "resolve") return;
            message.done.then(({ loader }) =>
              loaderMap.set(message.path, loader)
            );
          },
        });
        console.log(result.outputFiles);
        const file = result.outputFiles[0];
        const loader = loaderMap.get(entryURL) ?? "text";

        setState({
          type: "done",
          code: templateURL
            ? await applyTemplate(
              file.text,
              entryURL,
              templateURL,
              initialOptions.reload,
            )
            : file.text,
          fileName: templateURL ? "import" : file.path,
          loader: templateURL ? "json" : loader,
        });
      } catch (error: unknown) {
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
      {state.type === "done" && <BuildResult {...state} />}
    </>
  );
};

interface Building {
  type: "building";
}
interface Built {
  type: "done";
  code: string;
  loader: Loader;
  fileName: string;
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
