import { useReducer } from "preact/hooks";

/** Returns a URL representing the given Blob or File object.  */
export const useObjectURL = (blob: Blob): string => {
  const [{ url }, dispatch] = useReducer(reducer, {
    url: URL.createObjectURL(blob),
    blob,
  });
  dispatch(blob);
  return url;
};

interface State {
  url: string;
  blob: Blob;
}

const reducer = (prev: State, blob: Blob): State => {
  if (prev.blob === blob) return prev;
  URL.revokeObjectURL(prev.url);
  return {
    url: URL.createObjectURL(blob),
    blob,
  };
};
