# PUBLIC CONNECT 採用ランディング（静的サイト）

## ローカルでプレビューする（一番かんたん）

1. Finder でこのフォルダを開く  
2. **`index.html`** をダブルクリックする（または Chrome にドラッグ＆ドロップ）

またはターミナルで（同じフォルダにいるとき）:

```bash
python3 -m http.server 8080
```

ブラウザで `http://localhost:8080/` を開く。

## GitHub 上でプレビューする（GitHub Pages）

1. このリポジトリを GitHub に push する  
2. GitHub のリポジトリページ → **Settings** → **Pages**  
3. **Build and deployment** で **Source** を **Deploy from a branch** にする  
4. **Branch** を `main` / フォルダ **`/(root)`** を選んで Save  

このリポジトリの公開 URL（GitHub Pages）:

**https://akirasato0926.github.io/public-connect-recruit-lp/**

（反映まで数分かかることがあります。404 のときはしばらく待ってから再読み込みしてください。）

官公庁向け **UIモック**（サーバ不要）:

- **一覧:** https://akirasato0926.github.io/public-connect-recruit-lp/recruit/mock/index.html  
- **既存システム＋US新機能の位置づけ（推奨）:** https://akirasato0926.github.io/public-connect-recruit-lp/recruit/mock/employer-integration-map.html  
- **営業向けストーリーUI（一枚スクロール）:**  
  - https://akirasato0926.github.io/public-connect-recruit-lp/recruit/sales-ui/ （末尾 `/` 推奨）  
  - 代替（リダイレクト）: https://akirasato0926.github.io/public-connect-recruit-lp/recruit/sales-ui-showcase.html  

push 直後は GitHub Pages の反映に **1〜5 分**かかり、一時的に 404 になることがあります。数分待って再読み込みするか、上の「代替」URLを試してください。

ナビは本番 Nuxt の `MEMBER_RECRUITMENT` 相当のタブを再現し、**既存（求人・応募・ブログ等）** と **US で追加する分析系** の両方へ辿れます。

## フォルダ構成（主要）

| パス | 内容 |
|------|------|
| `index.html` | ランディング本体 |
| `styles.css` / `script.js` | スタイル・スクリプト |
| `assets/` | データ等 |
| `recruit/` | 採用ドキュメント・モック |
| `recruit/figma-handoff/` | **営業/Figma用** トークン表・参照HTML・SVG（本番UI色に寄せた素材） |
| `recruit/sales-ui/` | **官公庁向けストーリーUI** 一枚スクロール（`index.html` + `showcase.css`） |
