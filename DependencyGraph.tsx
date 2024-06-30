/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />
/** @jsx h */
/** @jsxFrag Fragment */
import {
  createContext,
  Fragment,
  FunctionComponent,
  h,
  useMemo,
} from "./deps/preact.tsx";
import { Loader } from "./deps/esbuild-wasm.ts";
import { format } from "./deps/fmt.ts";

export interface DependencyNode {
  /** file path */
  path: string;
  loader: Loader;
  /** bundleがスキップされたfileかどうか */
  external: boolean;
  loaded: boolean;
  byte: number;
  bytesInOutput: number;
  isCache: boolean;
  firstParentPath?: string;
  /** このfileでimportしているfiles */
  children: DependencyNode[];
}

const context = createContext<Map<string, DependencyNode>>(new Map());

export const DependencyGraph: FunctionComponent<
  { pathMap: Map<string, DependencyNode>; entryPoints: string[] }
> = ({ pathMap, entryPoints }) => {
  const entryNodes = useMemo(() =>
    entryPoints.flatMap((entryPoint) => {
      const node = pathMap.get(entryPoint);
      return node ? [node] : [];
    }), [pathMap, ...entryPoints]);
  return (
    <context.Provider value={pathMap}>
      {entryNodes.map((node) => <DepNode key={node.path} node={node} />)}
    </context.Provider>
  );
};

export const DepNode: FunctionComponent<
  { node: DependencyNode; viewedPath?: Set<string> }
> = ({ node, viewedPath }) => {
  viewedPath ??= new Set();

  const classList: string[] = [];
  let title: string | undefined;
  if (node.external) {
    classList.push("external");
  } else if (!node.loaded) {
    classList.push("loading");
  } else if (node.bytesInOutput === 0) {
    classList.push("tree-shaked");
    title = "Removed by tree-shaking";
  }

  const viewed = viewedPath.has(node.path);
  if (viewed || node.children.length === 0) {
    if (viewed) classList.push("viewed");
    return (
      <div className={classList.join(" ")} title={title}>
        <NodeInfo {...node} />
      </div>
    );
  }
  viewedPath.add(node.path);

  return (
    <details open>
      <summary className={classList.join(" ")} title={title}>
        <NodeInfo {...node} />
      </summary>
      <ul>
        {node.children.map((child) => (
          <li key={child.path}>
            <DepNode node={child} viewedPath={viewedPath} />
          </li>
        ))}
      </ul>
    </details>
  );
};

const NodeInfo: FunctionComponent<DependencyNode> = (node) => (
  <>
    <i
      className={`fas fa-${
        node.external
          ? "paperclip"
          : !node.loaded
          ? "spinner"
          : node.isCache
          ? "database"
          : "globe"
      }`}
      title={node.external
        ? "preserve"
        : !node.loaded
        ? "loading"
        : node.isCache
        ? "use cache"
        : "download"}
    />{" "}
    {`${node.path} (${format(node.byte)})`}
  </>
);
