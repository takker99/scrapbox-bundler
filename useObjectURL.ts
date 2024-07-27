import { useReducer } from "./deps/preact.tsx";

/**
 * Returns a URL representing the given Blob or File object.
 *
 * @param blobParts - An array of `BlobPart` values that will be put inside the `Blob`.
 * @param options - An optional `BlobPropertyBag` object containing options for creating the `Blob`.
 * @returns A string representing the URL of the `Blob` object.
 */
export const useObjectURL = (
  blobParts?: BlobPart[],
  options?: BlobPropertyBag,
): string => {
  const [{ url }, dispatch] = useReducer(
    reducer,
    {
      url: URL.createObjectURL(new Blob(blobParts, options)),
      blobParts,
      options,
    },
  );
  dispatch({ blobParts, options });
  return url;
};

interface State {
  url: string;
  blobParts?: BlobPart[];
  options?: BlobPropertyBag;
}

const reducer = (prev: State, action: Omit<State, "url">): State => {
  if (
    prev.blobParts?.every?.((part, i) => part === action.blobParts?.[i]) &&
    prev.options?.type === action.options?.type
  ) {
    return prev;
  }
  URL.revokeObjectURL(prev.url);
  return {
    ...action,
    url: URL.createObjectURL(new Blob(action.blobParts, action.options)),
  };
};
