#!/bin/bash

echo "🚀 开始部署 Nuxt 应用..."

# 1. 停止当前运行的应用
echo "⏹️  停止当前应用..."
pm2 stop nuxt-app 2>/dev/null || true

# 2. 构建应用
echo "🔨 构建应用..."
npm run build

# 3. 启动新版本
echo "▶️  启动新版本..."
PORT=8000 HOST=0.0.0.0 pm2 start .output/server/index.mjs --name "nuxt-app"

# 4. 检查状态
echo "✅ 部署完成！"
echo "📊 应用状态："
pm2 list | grep nuxt-app

echo "🌐 访问地址：https://test.gdyunzhu.com"
