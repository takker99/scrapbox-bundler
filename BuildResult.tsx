import { FunctionComponent, RefCallback } from "preact";
import { useCallback } from "preact/hooks";
import { useObjectURL } from "./useObjectURL.ts";
import { FileDownload } from "./Icons.tsx";
import { ExternalLinkAlt } from "./Icons.tsx";
import { useCopy } from "./useCopy.tsx";

export const BuildResult: FunctionComponent<{
  file: File;
}> = ({ file }) => {
  const { copy, Copy } = useCopy(file);
  const url = useObjectURL(file);
  const load: RefCallback<HTMLElement> = useCallback((el) => {
    if (!el) return;
    file.text().then((text) => el.textContent = text);
  }, [file]);

  return (
    <p className="build-result">
      <pre className="title"><code>{file.name}</code></pre>
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
        download={file.name}
        title="download the code"
      >
        {FileDownload}
      </a>
      <pre className="code"><code ref={load} /></pre>
    </p>
  );
};
