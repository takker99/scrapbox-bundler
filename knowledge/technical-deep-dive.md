# 技術構成・アーキテクチャ

## 技術スタック

| 領域              | 技術                                                                                |
| ----------------- | ----------------------------------------------------------------------------------- |
| 言語              | TypeScript (Deno)                                                                   |
| フレームワーク    | Preact (React互換、JSX)                                                             |
| bundler (runtime) | esbuild-wasm (`@takker/esbuild-wasm-no-blob` v0.24.0)                               |
| bundler (build時) | esbuild + `@luca/esbuild-deno-loader`                                               |
| ホスティング      | Vercel                                                                              |
| API サーバー      | Oak (Deno用HTTPフレームワーク) on Vercel Serverless Functions (`vercel-deno@3.1.1`) |
| パッケージ管理    | Deno (JSR + npm + URL imports)                                                      |

## アーキテクチャ概要

```
┌─ Browser ──────────────────────────────────────────┐
│                                                     │
│  index.html                                         │
│    ├── index.js (App.tsx → esbuild でbuild済み)     │
│    │     ├── URLパラメータ解析 (parseParams.ts)     │
│    │     ├── esbuild-wasm 初期化                    │
│    │     ├── Preact UIレンダリング                  │
│    │     └── build実行 → 結果表示                   │
│    ├── worker.js (esbuild Web Worker)               │
│    └── esbuild.wasm                                 │
│                                                     │
│  Cache API ← fetchしたモジュールをキャッシュ        │
│                                                     │
└─────────────┬───────────────────────────────────────┘
              │ scrapbox.ioへのリクエストはproxyを経由
              ▼
┌─ Vercel ────────────────────────────────────────────┐
│                                                     │
│  api/index.ts (Oak)                                 │
│    └── /api/* → https://scrapbox.io/* へプロキシ    │
│         (CORS回避用リバースプロキシ)                │
│                                                     │
│  assets/ (静的ファイル)                             │
│    ├── index.html                                   │
│    ├── index.css                                    │
│    ├── index.js     ← scripts/build.tsで生成       │
│    ├── index.js.map                                 │
│    ├── worker.js    ← scripts/build.tsで生成       │
│    └── worker.js.map                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## ファイル構成と役割

### エントリポイント・コアロジック

| ファイル                  | 役割                                                                                                                                                      |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `App.tsx`                 | メインアプリケーション。Preactコンポーネント。URLパラメータの解析、esbuild初期化、build実行、結果UIの描画を担う                                           |
| `build.ts`                | esbuild-wasmのbuild関数ラッパー。remoteLoader/resolverプラグインを設定してbuildを実行                                                                     |
| `parseParams.ts`          | URLの`search`パラメータを解析し、`BundleOptions`に変換する                                                                                                |
| `parseParams.test.ts`     | `parseDefine`関数のユニットテスト                                                                                                                         |
| `fetch.ts`                | Cache API統合付きfetch。esbuildバージョンごとにキャッシュを分離し、古いキャッシュは自動削除。scrapbox.ioへのリクエストは自動的にプロキシURLにリダイレクト |
| `reload.ts`               | `Reload`型の定義と`preferReload`関数。URLPatternを使い、特定URLのキャッシュ無視を制御                                                                     |
| `loader.ts`               | esbuildのLoader種別からMIMEタイプと拡張子へのマッピング                                                                                                   |
| `isFormat.ts`             | esbuildのFormat型ガード (`esm`/`iife`/`cjs`)                                                                                                              |
| `restoreEntryPointURL.ts` | esbuildの出力パスから元のエントリポイントURLを復元                                                                                                        |
| `applyTemplate.ts`        | テンプレートにbuild結果を埋め込み、Scrapbox import用JSONデータを生成                                                                                      |

### UIコンポーネント

| ファイル          | 役割                                                                   |
| ----------------- | ---------------------------------------------------------------------- |
| `BuildResult.tsx` | build結果1件の表示。コード表示、コピー、新タブで開く、ダウンロードのUI |
| `useCopy.tsx`     | クリップボードコピーのカスタムフック                                   |
| `useObjectURL.ts` | BlobからObject URLを生成・管理するカスタムフック                       |
| `Icons.tsx`       | Font Awesomeアイコンのコンポーネント                                   |

### 依存関係ラッパー (`deps/`)

| ファイル          | 役割                                                 |
| ----------------- | ---------------------------------------------------- |
| `remoteLoader.ts` | ScrapJupyterの`remoteLoader`/`robustFetch`を再export |
| `importmap.ts`    | import map解決ライブラリの再export                   |
| `worker.ts`       | esbuild-wasm-no-blobのWorkerエントリポイント         |
| `toDataURL.ts`    | BlobをData URLに変換するユーティリティ               |
| `throttle.ts`     | 非同期throttle関数                                   |

### ビルド・デプロイ

| ファイル           | 役割                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------- |
| `scripts/build.ts` | Denoで実行するビルドスクリプト。App.tsxとworker.tsをesbuildでbundle&minifyし、`assets/`に出力 |
| `deno.jsonc`       | Denoの設定ファイル。import map、タスク定義、コンパイラオプション                              |
| `vercel.json`      | Vercelのデプロイ設定。Deno runtimeのServerless Functions、リライトルール、ビルドコマンド      |

### API

| ファイル       | 役割                                                                                                                               |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `api/index.ts` | Vercel Serverless Function。scrapbox.ioへのリバースプロキシ。CORS回避のため、`/api/*`へのリクエストを`https://scrapbox.io/*`に転送 |

### 静的アセット (`assets/`)

| ファイル     | 役割                                                     |
| ------------ | -------------------------------------------------------- |
| `index.html` | HTMLエントリポイント。Font Awesome CDNを読み込み         |
| `index.css`  | スタイルシート。CSS Grid Layoutを活用したbuild結果表示UI |

## ビルドパイプライン

### 開発時 (`deno task dev`)

Vercel CLIのdev serverを使用。

### プロダクションビルド (`deno task build`)

1. `scripts/build.ts` が `App.tsx` と `deps/worker.ts` をesbuildでbundle +
   minify
2. 出力先は `assets/` ディレクトリ (ESM format, linked sourcemap)
3. `@luca/esbuild-deno-loader` プラグインでDeno式のモジュール解決を使用
4. ビルド後 `deno.lock` を削除（Vercel上でのロックファイル競合を回避）

### Vercelデプロイ

1. `installCommand`: Deno v2.0.5 をインストール
2. `buildCommand`: `deno task build` を実行
3. `assets/` がOutput Directoryとして配信
4. `api/index.ts` は `vercel-deno@3.1.1` ランタイムでServerless
   Functionとして動作

## キャッシュ戦略

- **Cache API** を使用（`fetch.ts`）
- esbuildのバージョン文字列をキャッシュ名として使用 →
  バージョン更新時に古いキャッシュを自動クリア
- `data:` や `blob:` URLはキャッシュしない
- scrapbox.ioへのリクエストはプロキシURLに書き換えてからキャッシュ
- `reload`パラメータで、特定URLまたは全URLのキャッシュ無視が可能（URLPattern対応）

## CORS回避

scrapbox.ioはCORSヘッダーを返さないため、直接fetchできない。以下の方法で回避：

1. **Vercel Serverless Functionによるプロキシ** (`api/index.ts`):
   `scrapbox.io`ドメインへのリクエストを`/api/*`経由に書き換え
2. `fetch.ts`内の`proxy()`関数が、`scrapbox.io`ホストのリクエストを自動的にプロキシURLにリライト

過去にはpax.deno.devやdeno.landのリダイレクト処理もクライアント側で行っていたが、現在は`remoteLoader`（ScrapJupyterから取得）がこの処理を担当。

## 主要な外部依存

| パッケージ                     | 用途                                               |
| ------------------------------ | -------------------------------------------------- |
| `@takker/esbuild-wasm-no-blob` | esbuild-wasmのfork。Blobを使わずにWorkerを起動可能 |
| `preact`                       | UIフレームワーク（React互換）                      |
| `option-t`                     | Result型によるエラーハンドリング                   |
| `@core/unknownutil`            | 型ガードユーティリティ                             |
| `@cosense/types`               | Scrapbox（Cosense）のREST API型定義                |
| `date-fns`                     | 日付操作（テンプレート機能のtimestamp生成）        |
| `ScrapJupyter` (GitHub raw)    | remoteLoader、robustFetch、URLPattern polyfill等   |
