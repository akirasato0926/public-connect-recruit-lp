# 採用ファネルダッシュボード詳細設計

## 目的

採用担当者が求人ごとの採用目標に対する進捗を把握し、
不足フェーズと改善対象を早期に見つけられるようにする。

## 主要ユースケース

1. 求人別の採用目標と現在の承諾数を比較する
2. フェーズ別通過率と離脱率を確認する
3. 充足率が低い求人に優先対応する
4. 年度ごとの改善傾向を比較する

## 画面構成

### ダッシュボードトップ

- 全体充足率
- 求人別サマリーカード
- アラート一覧
- 期間フィルタ

### 求人別ファネル詳細

- エントリー数
- 一次通過数
- 二次通過数
- 内定数
- 承諾数
- フェーズ別通過率と離脱率
- 平均滞留日数

### 比較ビュー

- 前年度比較
- 同職種比較
- 募集回比較

## ワイヤー要約

### ダッシュボードトップ

- ヘッダー
- フィルタ群
- KPIカード
- アラートパネル
- 求人別サマリー
- 全体ファネル
- 月次推移

### 求人別ファネル詳細

- 求人ヘッダー
- ファネルチャート
- フェーズ別メトリクステーブル
- 応募者セグメント
- 関連アクション

### 比較ビュー

- 比較軸フィルタ
- 比較テーブル
- 比較チャート

## データ項目定義

### KPI

| 項目ID | 項目名 | 型 | 算出方法 |
| --- | --- | --- | --- |
| targetHireCount | 採用目標人数 | integer | 手入力値 |
| totalEntryCount | エントリー数 | integer | 応募件数集計 |
| offerCount | 内定数 | integer | 選考結果集計 |
| acceptCount | 承諾数 | integer | 内定承諾集計 |
| fulfillmentRate | 充足率 | decimal | acceptCount / targetHireCount |
| avgPassRate | 平均通過率 | decimal | 各フェーズ通過率平均 |
| avgLeadDays | 平均滞留日数 | decimal | フェーズ滞留日数平均 |

### 求人サマリー

| 項目ID | 項目名 | 型 |
| --- | --- | --- |
| jobId | 求人ID | string |
| jobTitle | 求人名 | string |
| jobCategoryName | 職種名 | string |
| departmentName | 部署名 | string |
| targetHireCount | 採用目標人数 | integer |
| entryCount | エントリー数 | integer |
| firstPassCount | 一次通過数 | integer |
| secondPassCount | 二次通過数 | integer |
| offerCount | 内定数 | integer |
| acceptCount | 承諾数 | integer |
| dropoutRate | 離脱率 | decimal |
| fulfillmentRate | 充足率 | decimal |
| riskLevel | リスクレベル | enum |

### フェーズ別項目

| 項目ID | 項目名 | 型 |
| --- | --- | --- |
| phaseCode | フェーズコード | enum |
| phaseName | フェーズ名 | string |
| phaseApplicantCount | 対象人数 | integer |
| phasePassCount | 通過人数 | integer |
| phaseDropCount | 離脱人数 | integer |
| phasePassRate | 通過率 | decimal |
| phaseDropRate | 離脱率 | decimal |
| avgStagnationDays | 平均滞留日数 | decimal |
| nextInterviewAt | 次回面接日時 | datetime |
| alertFlag | アラート有無 | boolean |

## API設計

### `GET /api/employer/funnel-dashboard`

- フィルタ済みの KPI、アラート、求人サマリー、全体ファネル、トレンドを返す

### `GET /api/employer/funnel-dashboard/jobs/:jobId`

- 求人別の詳細ファネル、フェーズ一覧、応募者セグメント、アラートを返す

### `GET /api/employer/funnel-dashboard/compare`

- 複数年度、求人、職種の比較データを返す

### `GET /api/employer/funnel-dashboard/alerts`

- アラート一覧を返す

### `PATCH /api/employer/funnel-dashboard/alerts/:alertId`

- アラートの確認済みや解消状態を更新する

## DB設計

### `job_hiring_targets`

- 求人ごとの採用目標人数

### `application_stage_histories`

- 応募者のフェーズ遷移履歴

### `interview_schedules`

- 面接日時と状態

### `funnel_dashboard_daily_stats`

- 日次集計済みのファネル指標

### `funnel_alerts`

- ダッシュボードアラート

## アラート条件

- 充足率が閾値未満
- 特定フェーズの離脱率が高い
- 一定日数以上更新がない応募者が多い
- 面接日程が近いのに未確定応募者が残っている

## 権限

- `EMP_ADMIN`: 全求人閲覧、CSV出力、アラート更新
- `EMP_MANAGER`: 担当部署求人を閲覧、CSV出力
- `EMP_RECRUITMENT`: 担当求人を閲覧、アラート確認
- `RP`: 閲覧のみ
