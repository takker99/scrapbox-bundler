# 未実装のアイデア・改善案

Scrapboxのメモおよびソースコード調査から抽出した、今後実装が検討されているアイデアや改善提案。

---

## 🎯 高優先度（作者が明確に意図している）

### 1. ScrapboxのUserScript専用builderとして再構築

**出典**: `/takker/scrapbox-bundler` 実装したいことセクション

汎用bundlerとしての役割は`esm.sh`等が担っているため、Scrapbox
UserScript作成支援に特化する方向が検討されている。

想定される機能:

- 複数のJS/CSSをbuildし、指定したprojectの指定したpageの指定したcode
  blockに書き込む
- JSR importのモジュール解決をサポート（Semantic Versioningに基づく依存解決）
- **UI**: URLで生成（現行通り）+ CLIで生成（hot reload対応）
- CLIではlocalhost → GM_fetch経由でScrapboxに書き込み → 自動reload

### 2. JSR (JavaScript Registry) importのサポート

**出典**: `/takker/JSRの依存解決アルゴリズム`、`/takker/scrapbox-bundler`

`jsr:@scope/package`
形式のimportを解決する機能。scrapbox-userscript-std等をJSRにpublishするための前提条件。

課題:

- Semantic Versioningに基づいた依存解決アルゴリズムの実装が必要
- 代替案: ユーザー側でimport mapを使ってHTTPS URLに変換する

### 3. ServiceWorkerの導入

**出典**:
`/takker/scrapbox-bundlerにServiceWorkerを入れる~@2022-12-31`、`/takker/scrapbox-bundler`

目的:

- `esbuild.wasm` のキャッシュ（現在はCache APIのみ）
- プロキシ処理の責務をService Workerに移す
- キャッシュの細かい制御
- offline動作（ただしソースコードがリモートにある場合は意味が薄い）

コードの骨格は検討済みだが未実装。

### 4. build logの改善

**出典**: `/takker/scrapbox-bundler` 実装したいことセクション

- fetch error表示: ✅実装済み
- **色付きログ**: 未実装
- **スクロールバー付きログ表示**: 未実装

### 5. 相対パス生成の基準パスを指定可能にする

**出典**:
`/takker/⬜相対パスを生成する時の基準となるパスを指定できるようにする (scrapbox-bundler)`

URL parameter `base=:url`
を追加し、相対URLの基準を明示的に指定できるようにする。現在は`url`パラメータが暗黙的に基準となるが、テンプレート使用時などに問題が生じうる。

---

## 🔧 中優先度（有用だが着手されていない）

### 6. bookmarklet生成モード

**出典**: `/takker/scrapbox-bundler` 実装したいことセクション

- `javascript:(async()=>{})()`で囲んだコードを出力
- 予めURLエンコーディングしておく
- drag & dropで導入できるボタンの設置

### 7. Scrapbox JSON data生成処理のWorker移行

**出典**: `/takker/scrapbox-bundler` 実装したいことセクション

テンプレート適用とJSON生成をWeb
Workerに移してUIスレッドをブロックしないようにする。

### 8. dependency graph表示の再実装

**出典**: `/takker/scrapbox-bundler` バグセクション

2024-07-27に削除されたdependency
graph表示を、パフォーマンスの問題を解決した上で再実装する。

方針:

- Reactの差分更新ではなく直接DOM操作
- `ResolveInfo | LoadInfo`につき1回だけDOM更新
- DOM構造自体を階層構造の情報として扱う

### 9. warnings/errorsのUI表示の充実

**出典**: `/takker/scrapbox-bundler` 実装したいことセクション

現在もesbuildのerrors/warningsは表示されるが、より見やすいフォーマットやフィルタリング機能が求められている。

### 10. esbuildバージョンの表示

**出典**: `/takker/scrapbox-bundler` バグセクション

使用しているesbuild-wasmのバージョンをUIに表示する。デバッグやトラブルシューティングに有用。

---

## 💡 アイデア段階

### 11. 設定画面UIの復活

**出典**: `/takker/scrapbox-bundler` 使い方セクション

以前は設定画面からGUIで設定してbuildする機能があったが、PR
#13で削除された。「作るモチベがまったくない」「使わないコードの型修正が不毛」とのこと。URLパラメータ直接指定で十分機能している。

### 12. `remoteLoader`のリファクタリング

**出典**: `/takker/2024-07-25 振り返り`

`remoteLoader`プラグインの責務を見直す提案:

- reloadするかどうかはこのプラグインの責務ではない
- プラグインがすべきこと:
  1. https importでないimport pathを`https://`や`file://`形式に変換
  2. semverを固定バージョンに書き換え
  3. データ取得URLを外部に委譲
- reloadかキャッシュ使用かはdata loaderに任せるべき

### 13. `esbuild_deno_loader`への移行

**出典**: `/takker/@takker/ScrapJupyter`

`RemoteLoader`を`esbuild_deno_loader`に置き換える構想。`Deno`をmockで提供すればweb
browserでも動作可能と確認済み。`onLoader`プラグインだけ自前で書く必要がある。

### 14. Chrome拡張機能としての実装

**出典**: `/takker/scrapbox-bundler` 関連セクション

DevTools上でesbuildするChrome拡張（[motemen氏の実装](https://motemen.hatenablog.com/entry/2022/03/chrome-extension-esbuild)）にインスパイアされた案。拡張機能なら中途半端にサーバーを経由する必要がなくなる。

### 15. CLIモード (hot reload対応)

**出典**: `/takker/scrapbox-bundler` 実装したいことセクション

localhost →
GM_fetch経由でデータを取得し、`import-dev`の仕組みでScrapboxのコードブロックに書き込んでreloadする、ローカル開発ループの構築。

---

## ✅ 解決済み（参考情報）

以下は過去に問題だったが、既に解決済みの項目:

- ✅ `external`にURL parameter付きURLを渡すとparametersが削除される → PR
  #10で修正
- ✅ esmのexportが処理できない → entry
  pointのコード内容をstdinに直接渡す方式に変更
- ✅ scrapbox-proxyの統合 → PR #11でVercel Serverless Functionとして統合
- ✅ entry pointのURLがreloadで再読み込みできない → 修正済み
- ✅ GitHub PagesのURL長制限 → Vercelに移行で解決
- ✅ CSS中のurl()に指定した画像/fontをbundleしようとしてバグる →
  `external`で回避
- ✅ `define`オプション対応 → PR #9で実装
- ✅ fetch errorの表示 → 実装済み
