import { type FunctionComponent, render } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import { parseSearchParams } from "./parseParams.ts";
import { build } from "./build.ts";
import {
  type BuildOptions,
  formatMessages,
  initialize,
  type Loader,
  type Message,
  type Metafile,
} from "@takker/esbuild-wasm-no-blob";
import { fetch } from "./fetch.ts";
import { ChartPie, CheckCircle, Spinner, TimesCircle } from "./Icons.tsx";
import { BuildResult } from "./BuildResult.tsx";
import { applyTemplate } from "./applyTemplate.ts";
import { restoreEntryPointURL } from "./restoreEntryPointURL.ts";
import { extname, loaderFromExtension, mimeType } from "./loader.ts";
import { extname as pathExtname } from "@std/path/posix/extname";
import { isErr, unwrapOk } from "option-t/plain_result";
import { toDataURL } from "./deps/toDataURL.ts";
import { preferReload, type Reload } from "./reload.ts";
import { isArray } from "@core/unknownutil/is/array";
import { isRecord } from "@core/unknownutil/is/record";

const { templateURL, ...initialOptions } = parseSearchParams(
  location.search,
);

{
  const wasmURL = new URL("./esbuild.wasm", import.meta.url);
  const result = await fetch(
    new Request("./esbuild.wasm"),
    !preferReload(wasmURL, initialOptions.reload),
  );
  if (isErr(result)) throw Error("Failed to fetch esbuild.wasm.");

  await initialize({
    worker: "./worker.js",
    wasm: await WebAssembly.compileStreaming(unwrapOk(result)[0]),
  });
}

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
  reload: Reload;
  entryPoints: string[];
  importMapURL?: URL;
}

interface AppProp {
  options: BundleOptions;
  templateURL?: URL;
}

const replaceExtension = (url: string, extension: string): string => {
  if (extension === "" || url.endsWith(extension)) return url;
  const replaced = url.replace(/\.[^/.]+$/, extension);
  return replaced === url ? `${url}${extension}` : replaced;
};

const App: FunctionComponent<AppProp> = ({ options, templateURL }) => {
  const [state, setState] = useState<State>({ type: "building" });

  useEffect(() => {
    (async () => {
      const { entryPoints, importMapURL, ...params } = options;
      const loaderMap = new Map<string, Loader>();
      // Create a map from entry point URLs (without extension) to their original extensions for fallback
      // This allows us to look up the original extension even after restoreEntryPointURL strips it
      const entryPointExtensions = new Map(
        entryPoints.map((url) => {
          const parsedURL = new URL(url);
          const ext = pathExtname(parsedURL.pathname);
          // Remove extension from pathname, and clear search/hash to match restoreEntryPointURL behavior
          if (ext) {
            parsedURL.pathname = parsedURL.pathname.slice(0, -ext.length);
          }
          parsedURL.search = "";
          parsedURL.hash = "";
          return [parsedURL.href, ext];
        })
      );
      
      try {
        let dataURL: string | undefined;
        if (importMapURL) {
          const result = await fetch(
            new Request(importMapURL),
            !preferReload(importMapURL, options.reload),
          );
          if (isErr(result)) throw Error("Failed to fetch import map.");
          const [res] = unwrapOk(result);
          dataURL = await toDataURL(await res.blob());
        }

        const buildResult = await build({
          entryPoints: entryPoints.map((url) => ({ in: url, out: url })),
          ...params,
          importMapURL: dataURL,
          outdir: "./",
          onProgress: (message) => {
            message.done.then(({ loader }) =>
              loaderMap.set(message.path.href, loader)
            );
          },
        });
        const files = new Map(buildResult.outputFiles.map((file) => {
          const url = restoreEntryPointURL(file.path);
          const outputExt = pathExtname(file.path);
          
          // Try multiple strategies to determine the correct loader:
          // 1. From output extension (most reliable for known extensions)
          // 2. From loader map (set during onProgress)
          // 3. From original entry point extension (fallback)
          // 4. Default to "text" as last resort
          let loader = loaderFromExtension(outputExt);
          if (!loader) {
            loader = loaderMap.get(url);
          }
          if (!loader) {
            const originalExt = entryPointExtensions.get(url);
            if (originalExt) {
              loader = loaderFromExtension(originalExt);
            }
          }
          if (!loader) {
            console.warn(`Unable to determine loader for ${url}, defaulting to "text"`);
            loader = "text";
          }
          
          const ext = outputExt === "" ? extname(loader) : outputExt;
          const fileName = replaceExtension(url, ext);

          return [
            url,
            new File([file.contents], fileName, {
              type: mimeType(loader),
            }),
          ];
        }));

        const errors = await formatMessages(buildResult.errors, {
          kind: "error",
        });
        const warnings = await formatMessages(buildResult.warnings, {
          kind: "warning",
        });

        if (!templateURL) {
          setState({
            type: "done",
            files: [...files.values()],
            metafile: buildResult.metafile,
            errors,
            warnings,
          });
          return;
        }
        const result = await applyTemplate(
          files,
          location,
          templateURL,
          initialOptions.reload,
        );
        if (isErr(result)) throw new Error("Failed to fetch template.");
        const data = unwrapOk(result);
        setState({
          type: "done",
          files: [
            new File([JSON.stringify(data)], data.pages[0].title, {
              type: "application/json",
            }),
          ],
          metafile: buildResult.metafile,
          errors,
          warnings,
        });
      } catch (error: unknown) {
        console.error(error);

        const errors = await formatMessages(
          isRecord(error) && isArray(error.errors)
            ? error.errors as Message[]
            : [],
          { kind: "error" },
        );
        const warnings = await formatMessages(
          isRecord(error) && isArray(error.warnings)
            ? error.warnings as Message[]
            : [],
          { kind: "warning" },
        );
        if (errors.length === 0 && error instanceof Error) {
          errors.push(`${error}`);
        }
        setState({ type: "error", error, errors, warnings });
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
          : <>{TimesCircle} {" Failed to build."}</>}
      </p>
      {state.type !== "building" &&
        state.errors.length + state.warnings.length > 0 && (
        <>
          {state.errors.length > 0 && (
            <p>
              <strong>{state.errors.length} Errors:</strong>
              <ul>
                {state.errors.map((error, i) => (
                  <pre key={i}><code>{error}</code></pre>
                ))}
              </ul>
            </p>
          )}
          {state.warnings.length > 0 && (
            <p>
              <strong>{state.warnings.length} Warnings:</strong>
              <ul>
                {state.warnings.map((warning, i) => (
                  <pre key={i}><code>{warning}</code></pre>
                ))}
              </ul>
            </p>
          )}
        </>
      )}
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
            {state.files.map((file) => (
              <BuildResult key={file.name} file={file} />
            ))}
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
  errors: string[];
  warnings: string[];
}
interface Failed {
  type: "error";
  error: unknown;
  errors: string[];
  warnings: string[];
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
    <button
      type="button"
      className="metafile"
      onClick={download}
      title="download metafile"
    >
      {ChartPie}
      {" Download Metafile"}
    </button>
  );
};
