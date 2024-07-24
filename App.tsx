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
  useMemo,
  useState,
} from "./deps/preact.tsx";
import { parseSearchParams } from "./parseParams.ts";
import { build } from "./build.ts";
import { BundleOptions } from "./types.ts";
import { loaderToMimeType } from "./loaderToMimeType.ts";
import { DependencyGraph, DependencyNode } from "./DependencyGraph.tsx";
import { initialize } from "./deps/esbuild-wasm.ts";
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
  const [pathMap, setPathMap] = useState<Map<string, DependencyNode>>(
    new Map(),
  );
  useEffect(() => {
    (async () => {
      let presentPathMap = pathMap;
      const { entryURL, ...params } = options;
      const entryPoints = [entryURL];
      try {
        const result = await build({
          entryPoints,
          ...params,
          progressCallback: (message) => {
            switch (message.type) {
              case "resolve":
                setPathMap((prev) => {
                  const node: DependencyNode = prev.get(message.path) ??
                    {
                      path: message.path,
                      external: message.external,
                      loader: "text",
                      loaded: false,
                      byte: 0,
                      bytesInOutput: 0,
                      isCache: false,
                      children: [],
                    };
                  prev.set(message.path, node);
                  if (message.parent) {
                    node.firstParentPath ??= message.parent;
                    const parent = prev.get(message.parent) ?? {
                      path: message.parent,
                      external: false,
                      loader: "text",
                      loaded: false,
                      byte: 0,
                      bytesInOutput: 0,
                      isCache: false,
                      children: [],
                    };
                    parent.children = [...parent.children, node];
                    prev.set(message.parent, parent);
                  }
                  presentPathMap = new Map(prev);
                  return presentPathMap;
                });
                break;
              case "load":
                message.done.then(({ size, isCache, loader }) =>
                  setPathMap((prev) => {
                    const path = prev.get(message.path) ?? {
                      ...message,
                      loader,
                      external: false,
                      loaded: true,
                      byte: size,
                      bytesInOutput: size,
                      isCache,
                      children: [],
                    };
                    path.loader = loader, path.loaded = true;
                    path.byte = size;
                    path.bytesInOutput = size;
                    path.isCache = isCache;
                    presentPathMap = new Map(prev);
                    return presentPathMap;
                  })
                );
                break;
            }
          },
        });
        setPathMap((prev) => {
          const outputs = [...Object.values(result.metafile.outputs)].reduce(
            (input, cur) => ({ ...input, ...cur.inputs }),
            {} as Record<string, { bytesInOutput: number }>,
          );
          for (const [key, node] of prev) {
            node.bytesInOutput = outputs[key]?.bytesInOutput ?? 0;
          }
          return new Map(prev);
        });
        const file = result.outputFiles[0];
        const loader = presentPathMap.get(file.path)?.loader ?? "text";
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

  const entryPoints = useMemo(
    () =>
      options.importMapURL
        ? [options.entryURL, options.importMapURL.href]
        : [options.entryURL],
    [options.entryURL, options.importMapURL],
  );

  return (
    <>
      <p>
        {state === "building"
          ? "Building...please wait."
          : state === "done"
          ? "Finish building."
          : "Failed to build."}
      </p>
      <DependencyGraph pathMap={pathMap} entryPoints={entryPoints} />
    </>
  );
};

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
