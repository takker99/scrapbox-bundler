# scrapbox-bundler 概要

## 何をするアプリか

**Web browser上で動作するTypeScript/CSS bundlerツール。**
主にScrapboxのUserScript/UserCSSを生成する用途で使われるが、Scrapbox以外にも汎用的に利用可能。

`esbuild-wasm`
をクライアントサイドで実行し、URLで指定されたリモートのソースコードをbundle・minify・トランスパイルする。Deno
CLIで行っていたbundle処理をブラウザに持ち込んだもの。

## ベースURL

```
https://scrapbox-bundler.vercel.app
```

## 使い方

URLパラメータでエントリポイントとオプションを指定し、アクセスすると即座にbuildが開始される。

```
https://scrapbox-bundler.vercel.app?url=<ソースURL>&bundle&minify
```

### URL パラメータ一覧

| パラメータ                   | 説明                                                          |
| ---------------------------- | ------------------------------------------------------------- |
| `url` (または `entryPoints`) | エントリポイントのURL（複数指定可）                           |
| `bundle`                     | コードを1つにまとめる                                         |
| `minify`                     | コードを最小化する                                            |
| `sourcemap`                  | `inline` source mapを埋め込む                                 |
| `reload`                     | キャッシュを無視して再取得する。URLPatternで対象URLを限定可能 |
| `importmap`                  | import mapのURLを指定（`url`基準の相対パス可）                |
| `external`                   | bundleから除外するリソースのURL（複数指定可、相対パス可）     |
| `template`                   | Scrapbox JSON data生成用テンプレートのURL                     |
| `format`                     | 出力形式 (`esm`/`iife`/`cjs`、デフォルト: `esm`)              |
| `charset`                    | `noUtf8`で非UTF-8。デフォルトはUTF-8                          |
| `define`                     | `key:value`形式の定数定義（複数指定可）                       |
| `jsx`                        | JSXモード (`transform`/`preserve`/`automatic`)                |
| `jsx-factory`                | JSX factory関数名                                             |
| `jsx-fragment`               | JSX fragment関数名                                            |
| `jsx-import-source`          | JSX import source                                             |
| `jsx-dev`                    | JSX devモード                                                 |
| `jsx-side-effects`           | JSX side effects有効化                                        |
| `target`                     | ターゲット環境                                                |

### 使用例

```
# TypeScriptをbundle&minify
?url=https://scrapbox.io/api/code/villagepump/pin-diary-4/script.ts&bundle&minify

# CSSをbundle（externalで画像・フォントを除外）
?url=https://scrapbox.io/api/code/villagepump/Settings/style.css&external=https://fonts.googleapis.com/...&bundle&minify

# テンプレートを使ってScrapbox JSON dataを生成
?url=...&template=./template&bundle&minify
```

## メリット

- **ターミナル不要**: コマンドを打つ手間が省ける
- **モバイル対応**: ターミナルを使えない環境（スマートフォン等）でもbundle可能
- **リンクベースのワークフロー**:
  設定済みURLをScrapboxページに貼っておけば、リンクをクリックするだけでbundleしたコードを取得できる
- **キャッシュ機能**: Cache
  API経由でfetchしたモジュールをキャッシュし、再ビルドを高速化

## build結果のUI

build完了後、以下の操作が可能：

- **コピーボタン**: 生成コードをクリップボードにコピー
- **新規タブで開く**: 生成コードをObject URLで新規タブに表示
- **ダウンロード**: 生成コードをファイルとしてダウンロード
- **Metafileダウンロード**: esbuildのmetafile
  JSONをダウンロードし、[esbuild Bundle Size Analyzer](https://esbuild.github.io/analyze)で可視化可能

## template機能

`template`パラメータにテンプレートURLを指定すると、build結果をテンプレートに埋め込んだScrapboxの[import用JSONデータ](https://scrapbox.io/help-jp/ページデータのインポートとエクスポート)を生成できる。

テンプレート内の置換マーカー:

- `@URL@` → buildに使用したURL
- `@<エントリポイントURL>@` →
  対応するエントリポイントのbuild済みコード（インデント保持）
- `@CODE@` → 最初のエントリポイントのbuild済みコード（後方互換性）

## 歴史

- 2021-10: 開発開始。`UserScriptをbundleするDeno script`のbrowser版として構想
- 2021-11: GitHub Pagesにデプロイ → URLパラメータの長さ制限問題が発生
- 2021-11: Vercelに移行 (`scrapbox-bundler.vercel.app`)
- 2021-12: template機能（Scrapbox JSON data生成）を追加
- 2024-05: scrapbox-proxyを統合（別サーバーが不要に）
- 2024-07:
  UIリニューアル（download/copy/metafileボタン等を追加。旧`output`/`run`パラメータを廃止）

## 関連プロジェクト

- **@takker/ScrapJupyter**:
  Scrapbox上でコードブロックを実行するツール。scrapbox-bundlerを使ってinstallする
- **scrapbox-userscript-std**: UserScript向けの共通ライブラリ
- **esbuild-wasm-no-blob**: esbuild-wasmのfork。Blobを使わないWorker起動に対応
- **uniroll**: 類似ツール（Rollupベース、mizchi氏作）
- **esb.deno.dev**: サーバーサイドesbuild。競合サービスだがprivate
  projectのコードはbundleできない
