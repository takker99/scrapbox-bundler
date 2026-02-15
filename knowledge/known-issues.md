# 既知の問題点・バグ

Scrapboxのメモおよびソースコード調査から抽出した、未解決の問題やバグ。

---

## 🔴 バグ（未修正）

### 1. ~~`.css`が`.txt`と認識される~~ ✅ FIXED

**出典**: `/takker/scrapbox-bundler` バグセクション

**Status**: Fixed in PR #[number] (2026-02-15)

**Previous issue**: CSSファイルをbuildした際に、loader判定が`.css`ではなく`.txt`（text）として扱われるケースがあった。

**Fix**: App.tsxのloader検出ロジックを改善。4段階のフォールバック戦略を実装:
1. esbuildの出力拡張子から判定
2. loaderMapから判定
3. 元のエントリポイントの拡張子から判定（新規追加）
4. "text"にデフォルト（警告付き）

これにより、CSSファイルが誤って`.txt`と認識されることを防止。

### 2. ~~`.ts.js`になってしまう（出力ファイル名の問題）~~ ✅ RESOLVED

**出典**: `/takker/scrapbox-bundler` バグセクション

**Status**: Not a bug in current implementation (2026-02-15 verification)

**Previous concern**: TypeScriptファイルをbuildした際に、出力ファイルの拡張子が`.ts.js`のように二重になってしまうという報告。

**Analysis**: コード検証の結果、現在の実装は正しく動作することを確認:
- `restoreEntryPointURL()`が最後の拡張子（`.js`）を削除し、元の`.ts`を保持
- `replaceExtension()`が`.ts`を`.js`に正しく置換
- 結果: `module.ts` → `module.js` (正常動作)

テストケースで動作を確認済み。過去に修正されたか、特定の条件下でのみ発生する可能性あり。

### 3. percent encodingされた`/`を含むURLがテンプレート埋め込み時にデコードされてしまう

**出典**: `/takker/scrapbox-bundler` バグセクション

`https://scrapbox.io/api/code/takker/@takker%2FScrapJupyter/mod.ts`のように`%2F`を含むURLが、テンプレートへの埋め込み段階で`decodeURIComponent()`によって`/`に展開されてしまい、URLとして壊れる。

URLパラメータに`%252F`（二重エンコード）を渡しても解決しない。現状では仕様上の制限として受容されている。

### 4. import mapのscopes処理が正しく動作しない

**出典**: `/takker/作業ログ | scrapbox-bundler` (2021-11-11)

`deno_x/importmap`ライブラリの`scopes`処理に問題があり、import
mapの`scopes`フィールドが正しく解決されない。現在は`scopes`の使用を避けることで回避している。

---

## 🟡 パフォーマンス・UX問題

### 5. dependencyの階層が深いとUIが処理落ちする

**出典**: `/takker/scrapbox-bundler` バグセクション

以前存在したdependency
graph表示機能が、深いネストで処理落ちを起こしていた。2024-07-27に「そもそも実装がおかしい」として一旦削除された。今後再実装する場合は、Reactの差分更新ではなく直接DOM操作で1回限りの更新にする方針が示されている。

### 6. Vercel Serverless Functionの実行時間制限

**出典**: `/takker/scrapbox-bundler` 実装セクション、`/takker/Vercel Alert`

- Vercelの無料プランではServerless Functionの実行時間が5秒に制限されている
- build処理自体はクライアントサイドなので直接影響しないが、プロキシ経由のfetchが遅い場合にタイムアウトする可能性がある
- 2023年にVercelのServerless
  Function実行量が75%の警告を受けたことがある（原因は別プロジェクトだったが、wasmファイル配信もコストがかかる）

### 7. esbuildのバージョンがUI上に表示されない

**出典**: `/takker/scrapbox-bundler` バグセクション

現在使用しているesbuild-wasmのバージョンをUIに表示する機能がない。デバッグ時に有用な情報。

---

## 🟠 アーキテクチャ上の問題

### 8. esbuild-wasmの全コードをworker srcにしていることの問題

**出典**: `/takker/scrapbox-bundler` メインページ

esbuild-wasmの全コードをworker
srcにしてしまったことで、外部やユーザー定義の`fetch`を注入するのが難しくなっている。`@takker/ScrapJupyter`からbuild処理を共有したい場合に問題となる。

現在は`@takker/esbuild-wasm-no-blob`というforkで対処済みだが、根本的なアーキテクチャ上の課題は残っている。

### 9. ScrapJupyterへの強い依存

ソースコード調査から判明。`deps/remoteLoader.ts`、`deps/toDataURL.ts`がScrapJupyterのGitHub
raw URLから直接importしている。

```typescript
// deps/remoteLoader.ts
export * from "scrap-juptyer/remoteLoader.ts"; // deno.jsonc経由でGitHub rawに解決
```

ScrapJupyterのバージョン (`v1.7.4` / `v1.7.2`)
にハードピンされており、更新追従が手動になる。

### 10. api/index.ts がOakの古いバージョンに依存

`api/index.ts`で使用しているOakは`v11.1.0`で、URLにバージョンがハードコードされている。`vercel-deno`のランタイム制約もあり、更新が困難。

### 11. `scrapbox-url-customizer`のimport map互換性問題

**出典**:
`/villagepump/最近scrapbox-url-customizerで画像入りTweetの変換ができない`

scrapbox-bundlerのimport
mapで指定した`@takker/gyazo`のバージョンが、`scrapbox-url-customizer`が期待するバージョンと異なっていたために、画像入りTweetの変換が失敗するケースがあった。import
mapの依存バージョン管理が利用者任せになっている問題。
