/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />

export declare function fetch(
  path: URL | string,
  reload?: boolean,
): Promise<
  {
    type: "cache";
    response: Response;
  } | {
    type: "remote";
    response: Response;
  }
>;
