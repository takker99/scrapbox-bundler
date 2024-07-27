/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />
/** @jsx h */

import { FunctionComponent, h, useMemo } from "./deps/preact.tsx";
import { loaderToMimeType } from "./loaderToMimeType.ts";
import { Loader } from "./deps/esbuild-wasm.ts";
import { useObjectURL } from "./useObjectURL.ts";
import { FileDownload } from "./Icons.tsx";
import { ExternalLinkAlt } from "./Icons.tsx";
import { useCopy } from "./useCopy.tsx";

export const BuildResult: FunctionComponent<{
  code: string;
  fileName: string;
  loader: Loader;
}> = ({ code, loader, fileName }) => {
  const { copy, Copy } = useCopy(code);
  const blobURL = useObjectURL([code], { type: loaderToMimeType(loader) });
  const url = useMemo(() => loader === "dataurl" ? code : blobURL, [
    loader,
    code,
    blobURL,
  ]);

  return (
    <p className="build-result">
      <pre className="title"><code>{fileName}</code></pre>
      <button className="copy" onClick={copy} title="copy the code">
        {Copy}
      </button>
      <a
        className="open-new-tab"
        href={url}
        target="_blank"
        title="open the code in a new tab"
      >
        {ExternalLinkAlt}
      </a>
      <a
        className="download"
        href={url}
        download={fileName}
        title="download the code"
      >
        {FileDownload}
      </a>
      <pre className="code"><code>{code}</code></pre>
    </p>
  );
};
