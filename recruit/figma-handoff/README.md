# Figma / 営業資料向けハンドオフ

本番クライアント（Nuxt）の **色・角丸・影** に寄せた参照素材です。  
**Figma への自動変換はできない**ため、次のどれかで取り込んでください。

## 同梱ファイル

| ファイル | 用途 |
|----------|------|
| `design-tokens.md` | **カラー・タイポ・影・半径**の表（Figma の Local styles にコピー用） |
| `reference-employer-dashboard.html` | ブラウザで開く **高めの忠実度**の1画面。スクリーンショットや html.to.design の入力に。 |
| `frames/dashboard-overview.svg` | **1280×720** のベクター枠。Figma にドラッグ＆ドロップで配置後、パス編集可能。 |

## 推奨ワークフロー

1. `design-tokens.md` から **Color styles** を Figma に登録。  
2. `dashboard-overview.svg` をページに配置 → 必要ならグループ解除して調整。  
3. `reference-employer-dashboard.html` を Chrome で開き、**フルページのスクショ**を貼るか、利用可能なら **HTML to Figma プラグイン**で取り込み。  
4. スライドには **Figma から書き出した PNG（2x）** を使用。

## 注意

- フォントは Figma 側で **Noto Sans JP** を当てると本番に近づきます。  
- 実装の微差（Element Plus の内部トークンなど）は **完全一致ではありません**。
