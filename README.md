# i18n Demo

基于 React + react-i18next + i18next 实现的多语言切换 Demo

## 功能特点

- ✅ 中英文无刷新切换
- ✅ 从远程 URL 加载语言资源
- ✅ 现代化 UI 设计
- ✅ TypeScript 支持

## 技术栈

- React 18
- TypeScript
- Vite
- react-i18next
- i18next-http-backend

## 安装依赖

```bash
npm install
```

## 启动开发服务器

```bash
npm run dev
```

## 构建生产版本

```bash
npm run build
```

## 预览生产版本

```bash
npm run preview
```

## 语言资源

项目使用远程语言资源：
- URL: https://vision.xyb2b.com/black_test/prod/lang/data.json

## 项目结构

```
i18n-demo/
├── src/
│   ├── components/
│   │   └── LanguageSwitcher.tsx  # 语言切换组件
│   ├── i18n/
│   │   └── index.ts              # i18next 配置
│   ├── App.tsx                   # 主应用组件
│   ├── App.css                   # 应用样式
│   ├── main.tsx                  # 入口文件
│   └── index.css                 # 全局样式
├── index.html                    # HTML 模板
├── package.json                  # 项目配置
├── tsconfig.json                 # TypeScript 配置
└── vite.config.ts                # Vite 配置

```

