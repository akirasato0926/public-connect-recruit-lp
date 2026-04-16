# Recruit 現行実装マップ（3リポジトリ横断）

## 対象リポジトリ

1. API
- `/Users/akirasato/Downloads/Public-Connect-api-production`
- NestJS + TypeORM + PostgreSQL

2. Client
- `/Users/akirasato/Downloads/Public-Connect-client-production/Public-Connect-client-production`
- Nuxt 3 + Vue 3 + Pinia

3. Infra / Batch
- `/Users/akirasato/Downloads/Public-Connect-master-cdk/Public-Connect-master/cdk`
- AWS CDK + Lambda

## 1) API 実装状況

`src/modules` には 48 モジュールがあり、主要機能は既に実装済み。

### 機能群マッピング

- 認証、権限、ユーザー
  - `user`, `role`, `user-role`, `validation-token`
- 官公庁、求人、部署
  - `employer`, `job`, `job-entry`, `job-category`, `template-job`, `department`
- 応募、選考、メッセージ
  - `applicant`, `applicant-entry`, `setting-interview`, `schedule-under-adjustment`, `message`, `request-additional-information`, `spi-result-registration`
- コンテンツ、広報
  - `blog`, `job-blog`, `news`, `notice`, `special-feature`, `tags`, `top-content-setting`, `frequently-asked-question`
- お気に入り、探索
  - `favorite`, `favorite-job`, `favorite-blog`, `favorite-news`, `favorite-applicant`, `search-history`, `hidden-government-office`
- 管理、運用
  - `admin`, `invoice`, `mass-emailing`, `download-history`, `box`, `seen-notice`

## 2) Client 実装状況

`pages` は 190 以上あり、ロール別画面が既に揃っている。

### 主要ページ群

- 管理者: `admin/*` 53 ページ
- 官公庁: `employer/*` 80 ページ
- 求職者: `user/*` 53 ページ
- 公開側:
  - `index.vue`
  - `search/index.vue`
  - `job/[id].vue`
  - `employer-list/index.vue`
  - `news-list/index.vue`
  - `blog-list/*`
  - `special-feature/*`

### 認証、権限制御

`middleware` に `adminOnly`, `userOnly`, `employerOnly`, `employerAdminOnly`, `employerInterviewOnly` などがあり、ロール別アクセス制御が実装されている。

## 3) Infra / Lambda 実装状況

CDK スタックは `app`, `client`, `db`, `network`, `schedule`, `permissions`, `send_mail`, `alarm` などを分離して構成。

Lambda は 33 関数があり、通知、選考補助、出力処理、面接関連、履歴ジョブが実装済み。

### 代表ジョブ

- 通知、配信
  - `newBlogNotificationJob`
  - `hotNewsNotificationJob`
  - `notificationWorkFavoriteJob`
  - `desiredWorkLocationNotificationJob`
- 選考、面接補助
  - `settingInterviewRemainJob`
  - `settingInterviewSpiRemainJob`
  - `settingInterviewStartRoomRemainJob`
  - `userPickSchedule`
  - `createMessageAndInterviewEmployer`
- 応募補助
  - `createApplicantByUser`
  - `updateApplicantByUser`
  - `requestAdditionalInformationJob`
  - `spiResultRegistration`
- 出力、ファイル
  - `exportPdfApplicant`
  - `exportAllFilePdf`
  - `downloadFileZipEmployer`
  - `getBufferDownloadFileZip`

## 優先3機能に対する現状判定

### A. 採用ファネルダッシュボード

- 判定: `部分実装`
- 根拠:
  - API/Client ともに応募、選考、面接、求人管理の基礎がある
  - ただし、`採用目標人数` と `充足率` を中核にした統合ダッシュボード専用設計は未確認

### B. 母集団形成シミュレーター

- 判定: `未実装に近い`
- 根拠:
  - 必要母集団を逆算する専用ロジック、専用 API、専用画面の明確な痕跡は未確認

### C. 流入・コンテンツ効果分析 + レコメンド連携

- 判定: `部分実装`
- 根拠:
  - お気に入り、検索履歴、通知系ジョブは存在
  - ただし、コンテンツ流入分析と応募転換を統合した分析面、および高度レコメンドの統合仕様は未確認

## 次アクション（実装前）

1. API と Client で、優先3機能に関連する既存エンドポイントと既存画面を正確に棚卸しする
2. `部分実装` の範囲を既存仕様として固定する
3. その差分だけを追加開発対象に切り出す
4. まず `採用ファネルダッシュボード` の API と画面から着手する
