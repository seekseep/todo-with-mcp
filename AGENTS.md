# TODO アプリとそれを操作するMCPサーバー

このプロジェクトは一般的なTODOアプリを開発する。
ユーザーはブラウザからTODOの管理を行え。また、ChatGPTのデスクトップアプリからもTODOの管理を行える。

# 機能要件

- ユーザーはタスクのリストを追加できる
- ユーザーはタスクのリストの名前を設定できる
- ユーザーはタスクのリストにタスクを追加できる
- ユーザーはタスクの完了状態を切り替えできる
- ユーザーはタスクに期日を設定できる
- ユーザーはタスクの一覧から期日の近い順にソートできる

# ドメインモデル

## リスト

属性は以下の通り

- 名前

## タスク

属性は以下の通り

- 内容
- 状態
- 期日

# 技術要件

## DB

データベースはSQLiteを使用する。

## API

- APIはRESTfulな設計とする。
- Hono を使って実装する
- DDD を意識して, routes, domain, application, repository に分ける
  - routes ではリソースごとにファイルを分ける
  - routes は application を呼び出す
  - application は domain と repository を呼び出す
  - repository は DB にアクセスする
- Honoの中にSwaggerのプラグインを入れる
- domain の方の定義やリクエストのパースは Zod を使う
- DB アクセスは Prisma を使う
  - マイグレーションを設定する

## クライアント

- React / TypeScript を使用する
- api が生成するSwaggerをもとに型定義を自動生成する
- Tanstrack React Query を使用してAPIと通信する
- react-router を使用してルーティングを行う
- tailwindcss を使用してスタイリングを行う
- フォームのバリデーションには React Hook Form と Zod を使用する
- services な

```
/client
  /src
    /services  # APIクライアント
    /components # UIコンポーネント
    /routes
    App.tsx
    main.ts
```

# コード規約

- 関数ごとにJSDocコメントを書く
- 変数名、関数名、クラス名はキャメルケースを使用する
- 定数は全て大文字のスネークケースを使用する
- インデントはスペース2つを使用する
- any は使用しない
- ESLint を設定する
-
