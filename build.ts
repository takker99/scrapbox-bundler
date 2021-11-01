const formatList = ["esm", "iife", "cjs"] as const;
export type Format = (typeof formatList)[number];
export function isFormat(format: string): format is Format {
  return (formatList as [string, string, string]).includes(format);
}
export type BundleOptions = {
  bundle: boolean;
  minify: boolean;
  charset?: "utf8";
  format: Format;
  entryURL: string;
  jsxFactory: string;
  jsxFragment: string;
};

const worker = new Worker("./worker.js");

export async function build(params: BundleOptions) {
  const built = new Promise<string>((resolve, reject) => {
    worker.postMessage(params);
    worker.addEventListener(
      "message",
      (event) => resolve(event.data as string),
      {
        once: true,
      },
    );
    worker.addEventListener("error", (event) => reject(event), {
      once: true,
    });
  });
  return await built;
}
