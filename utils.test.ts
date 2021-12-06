/// <reference lib="deno.ns"/>
import { isBareModuleName } from "./utils.ts";
import { assert } from "./deps/testing.ts";

Deno.test("isBareModuleName", () => {
  assert(isBareModuleName("preact"));
  assert(isBareModuleName("lodash"));
  assert(isBareModuleName("react/hooks"));
  assert(!isBareModuleName("https://esm.sh/preact"));
  assert(!isBareModuleName("http://example"));
  assert(!isBareModuleName("file:///test.ts"));
  assert(!isBareModuleName("./utils.ts"));
  assert(!isBareModuleName("../utils.ts"));
  assert(!isBareModuleName("/path/to/index.js"));
});
