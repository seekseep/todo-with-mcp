# Todo with MCP

MCP (Model Context Protocol) サーバーの動作を理解するための学習用サンプルプロジェクトです。

このプロジェクトでは、Todo アプリケーションを通じて以下を学ぶことができます:
- MCP サーバーの基本的な実装方法
- Claude Desktop との連携方法
- リソースとツールの提供方法

## 必要な環境

- **Node.js**: v20 以上
- **npm**: v10 以上
- **Claude Desktop**: 最新版

## セットアップ

### 1. 依存パッケージのインストール

```bash
# API
cd api
npm install

# フロントエンド
cd ../client
npm install

# MCP サーバー
cd ../mcp
npm install
```

### 2. データベースのマイグレーション

```bash
cd api
npx prisma migrate dev
```

## 起動手順

### APIの起動

```bash
cd api
npm run dev
```

APIサーバーは `http://localhost:3000` で起動します。

### フロントエンドの起動

別のターミナルで実行:

```bash
cd client
npm run dev
```

フロントエンドは `http://localhost:5173` で起動します。

### 動作確認

ブラウザで `http://localhost:5173` にアクセスして、Todo アプリケーションが動作することを確認してください。

## Claude Desktop での MCP サーバー設定

### macOS の場合

`~/Library/Application Support/Claude/claude_desktop_config.json` を編集:

```json
{
  "mcpServers": {
    "todo": {
      "command": "node",
      "args": [
        "/Users/seekseep/Development/github.com/seekseep/todo-with-mcp/mcp/app.js"
      ]
    }
  }
}
```

**注意**: `args` 内のパスは、お使いの環境に合わせて絶対パスに変更してください。

### Windows の場合

`%APPDATA%\Claude\claude_desktop_config.json` を編集:

```json
{
  "mcpServers": {
    "todo": {
      "command": "node",
      "args": [
        "C:\\Users\\YourUsername\\path\\to\\todo-with-mcp\\mcp\\app.js"
      ]
    }
  }
}
```

**注意**:
- `args` 内のパスは、お使いの環境に合わせて絶対パスに変更してください
- Windows ではバックスラッシュをエスケープする必要があります (`\\`)

### 設定後

Claude Desktop を再起動すると、MCP サーバーが利用可能になります。
