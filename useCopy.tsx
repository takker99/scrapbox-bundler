/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />
/** @jsx h */
/** @jsxFrag Fragment */

import { Fragment, h, useCallback, useState } from "./deps/preact.tsx";
import { CheckCircle, Copy as CopyIcon } from "./Icons.tsx";

export const useCopy = (blob: Blob): {
  copy: VoidFunction;
  Copy: h.JSX.Element;
} => {
  const [Copy, setComponent] = useState<h.JSX.Element>(CopyIcon);
  const copy = useCallback(
    () =>
      blob.text().then((text) => navigator.clipboard.writeText(text)).then(
        () => {
          setComponent(Copied);
          setTimeout(() => setComponent(CopyIcon), 1000);
        },
      ).catch((e) => {
        console.error(e);
        alert("Failed to copy the code to the clipboard.");
      }),
    [blob],
  );
  return { copy, Copy };
};

const Copied = <>{CheckCircle}{" Copied"}</>;
