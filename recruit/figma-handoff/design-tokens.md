# PUBLIC CONNECT クライアント由来デザイントークン（Figma 用）

抽出元（参照時点のパス）:

- `Public-Connect-client-production/.../assets/scss/variables.scss`
- `Public-Connect-client-production/.../tailwind.config.js`

営業資料・Figma の **Color style / Text style** の定義にそのまま転記できるよう列挙しています。

## カラー（優先度順）

| トークン名（提案） | 値 | 出典メモ |
|-------------------|-----|----------|
| **Primary** | `#0871E1` | `primary` / `--color-primary` |
| **Primary / 15%** | `#0871e140` | `heading-color`（見出し下線等） |
| **Primary / 60%** | `#0871e199` | `fourth` |
| **Secondary tint** | `#E6F1FC` | `secondary`（背景・タグ） |
| **Secondary light** | `#CEE3F9` | `third` / `gray-linear` |
| **Blue secondary** | `#85B1E0` | 補助ブルー |
| **Text / default** | `#333333` | `black` / `--text-color` |
| **Text / muted** | `#A3A8AD` | `gray` |
| **Text / steel** | `#666666` | `steel-gray` |
| **Border** | `#DADCDE` | `color-border` / `gray-third` |
| **Background / page** | `#F8F8F8` | `color-bg` |
| **Background / section** | `#F1F2F3` | `gray-secondary` / `gray-700` |
| **Background / message** | `#F1F2F3` | `color-message` |
| **Danger** | `#FE4B28` | `danger` |
| **Danger / tint** | `#FFEDE9` | `danger-second` |
| **Success green** | `#13A119` | `green` |
| **White** | `#FFFFFF` | |
| **Input border** | `#c9cccf` 相当（99% 透明度は variables の記法） | `variables.scss` `$input-border-color` |

## タイポグラフィ（目安）

| 用途 | 提案 | メモ |
|------|------|------|
| 日本語 UI 本文 | **Noto Sans JP** または **Hiragino Sans** + ゴシック系フォールバック | 本番は Google Fonts + システムフォント |
| 英数字強調 | **Manrope**（Tailwind `fontFamily.man`） | ロゴ・数値で使用箇所あり |
| 本文色 | `#333333` | |
| 補助説明 | `#A3A8AD` | |

Figma では **Noto Sans JP Regular / Bold** をベースに、見出し Bold 12–16px、本文 12–14px 程度が官公庁コンソールに近いです（実画面はブレークポイントで可変）。

## レイアウト・効果

| トークン | 値 | 出典 |
|----------|-----|------|
| Card radius | `12px`（`0.75rem`） | `variables.scss` `$card-radius` |
| Input radius | `4px`（`0.25rem`） | variables |
| Shadow（軽） | `0px 0px 20px rgba(0, 0, 0, 0.1)` | `box-shadow-light` / `light-box` |
| Shadow（UI） | `0px 0px 10px rgba(0, 0, 0, 0.15)` | `base` |
| Letter spacing | `0.05em` | `--letter-spacing` |

## ブレークポイント（参考）

| 名前 | 条件 |
|------|------|
| mobile | max `480px` |
| pc | min `481px` |

営業用スライドは **1280×720** または **1920×1080** のフレームに、本番に近い **デスクトップ幅（pc）** を想定したレイアウトが無難です。

## Figma での作業メモ

1. **Color styles** を上表どおり登録（Primary / Text / Border / BG だけでも可）。
2. **`frames/dashboard-overview.svg`** を配置 → アンロックして編集可能に。
3. **`reference-employer-dashboard.html`** をブラウザで開き、**html.to.design** 等で取り込む場合は、フォントがローカルに無いと差が出るため、Figma 側で Noto Sans を入れて揃える。
