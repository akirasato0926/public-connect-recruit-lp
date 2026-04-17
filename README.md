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

採用モック HTML は **`/recruit/mock/`** です。  
例: https://akirasato0926.github.io/public-connect-recruit-lp/recruit/mock/

## フォルダ構成（主要）

| パス | 内容 |
|------|------|
| `index.html` | ランディング本体 |
| `styles.css` / `script.js` | スタイル・スクリプト |
| `assets/` | データ等 |
| `recruit/` | 採用ドキュメント・モック |
