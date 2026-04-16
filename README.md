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

数分後、次のような URL で公開されます（`ユーザー名` と `リポジトリ名` は置き換え）:

`https://<ユーザー名>.github.io/<リポジトリ名>/`

トップの `index.html` がそのまま表示されます。

## フォルダ構成（主要）

| パス | 内容 |
|------|------|
| `index.html` | ランディング本体 |
| `styles.css` / `script.js` | スタイル・スクリプト |
| `assets/` | データ等 |
| `recruit/` | 採用ドキュメント・モック |
