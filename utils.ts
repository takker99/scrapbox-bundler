/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
export function getPromiseSettledAnytimes<T, E = unknown>() {
  let _resolve: ((value: T) => void) | undefined;
  let _reject: ((value: E) => void) | undefined;
  const waitForSettled = () =>
    new Promise<T>(
      (res, rej) => {
        _resolve = res;
        _reject = rej;
      },
    );
  const resolve = (value: T) => _resolve?.(value);
  const reject = (reason: E) => _reject?.(reason);

  return [waitForSettled, resolve, reject] as const;
}
