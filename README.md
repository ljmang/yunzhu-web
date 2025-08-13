# Yunzhu Industry Website

云筑工业官方网站 - 专业的工业清洁剂和脱模剂制造商

## 项目简介

这是一个基于 Nuxt.js 3 和 Strapi CMS 构建的现代化企业官网，为云筑工业提供完整的在线展示和客户服务功能。

## 技术栈

- **前端框架**: Nuxt.js 3 (Vue.js 3)
- **样式框架**: Tailwind CSS
- **CMS 系统**: Strapi 4
- **数据库**: MySQL
- **部署管理**: PM2
- **包管理器**: npm

## 功能特性

### 🏠 首页
- 响应式设计，支持多设备访问
- 产品展示和行业应用介绍
- 公司优势和技术创新展示
- 最新文章和新闻动态

### 📦 产品展示
- 多分类产品展示（混凝土脱模剂、聚氨酯脱模剂等）
- 详细产品信息和应用场景
- 产品图片和规格参数
- 在线询价和样品申请

### 📚 资源中心
- 技术文章和行业资讯
- 常见问题解答 (FAQ)
- 视频教程和案例分享
- 下载中心

### 📞 客户服务
- 在线联系表单
- 多种联系方式展示
- 全球客户支持
- 技术咨询服务

### 🌐 多语言支持
- 中文和英文双语支持
- 国际化路由配置
- 本地化内容管理

## 项目结构

```
yunzhu-web/
├── assets/              # 静态资源
│   └── css/            # 样式文件
├── components/          # Vue 组件
├── composables/         # 组合式函数
├── layouts/            # 布局组件
├── pages/              # 页面文件
│   ├── about-us/       # 关于我们
│   ├── blog/           # 博客文章
│   ├── product/        # 产品页面
│   └── ...
├── plugins/            # 插件配置
├── server/             # 服务端 API
├── utils/              # 工具函数
├── public/             # 公共文件
└── nuxt.config.ts      # Nuxt 配置
```

## 快速开始

### 环境要求

- Node.js 18+ 
- npm 或 yarn
- MySQL 数据库

### 安装依赖

```bash
# 安装前端依赖
npm install

# 或使用 yarn
yarn install
```

### 开发环境

```bash
# 启动开发服务器
npm run dev

# 或使用 yarn
yarn dev
```

访问 http://localhost:3002 查看网站

### 生产构建

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

## 环境配置

### 前端环境变量

创建 `.env` 文件：

```env
# API 配置
NUXT_PUBLIC_API_BASE_URL=http://172.21.213.91:1337/api
NUXT_PUBLIC_STRAPI_URL=http://172.21.213.91:1337

# 其他配置
NODE_ENV=production
```

### Strapi 配置

Strapi CMS 需要单独配置和运行，详情请参考 Strapi 官方文档。

## 部署说明

### 使用 PM2 部署

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start npm --name "yunzhu-web" -- run start

# 查看状态
pm2 status

# 查看日志
pm2 logs yunzhu-web
```

### 服务器配置

- **端口**: 3002 (开发) / 3000 (生产)
- **域名**: gdyunzhu.com
- **SSL**: 支持 HTTPS

## 开发指南

### 代码规范

- 使用 ESLint 进行代码检查
- 遵循 Vue.js 3 组合式 API 规范
- 使用 TypeScript 进行类型检查

### 提交规范

```bash
git add .
git commit -m "feat: 添加新功能"
git push origin master
```

### 分支管理

- `master`: 主分支，用于生产环境
- `develop`: 开发分支
- `feature/*`: 功能分支

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

- **公司**: 东莞云筑新材料有限公司
- **网站**: https://www.gdyunzhu.com
- **邮箱**: SalesSupport@gdyunzhu.com
- **电话**: +86 18122288163

## 更新日志

### v1.0.0 (2025-08-13)
- 🎉 初始版本发布
- ✨ 完整的网站功能
- 🌐 多语言支持
- 📱 响应式设计
- 🔧 Strapi CMS 集成