# 简易博客Demo
本项目通过使用 Express、Vue、Next.js搭建了一个十分简单的个人博客系统，可以当做练手项目使用，熟悉后端、前端、数据库、服务端渲染等技术。

采用前后端分离方案实现，共分为3个小项目，分别为后台接口、后端管理、博客系统。

## 技术栈

### 后端技术栈

- 日志：`winston` 、`winston-daily-rotate-file`
- orm：`prisma`
- 数据库：`mysql`
- 参数校验：`class-validator`
- 配置读取：`dotenv`
- 鉴权
- 跨域
- Typescript
- Express

### 后台管理-前端技术栈
- Vue3
- VueRouter4
- Vite
- TS
- NaiveUI

### 博客前端技术栈
- Next.js (v13)
- TS
- React
- Tailwind Css

## 开发计划

### 后端计划
- [x] 实现文章的增删改查接口 & 标签关联
- [x] 实现标签的增删改查接口
- [x] 分页逻辑封装
- [x] 统一响应格式 & 响应方法封装 & 错误码封装
- [x] 登录鉴权部分
- [x] 文件上传部分 & 静态文件处理部分
- [x] 配置文件读取
- [x] 参数校验中间件
- [x] 路由封装
- [x] 日志
- [x] 博客前端页面所需接口开发

### 后台前端计划
- [x] 登录 & 状态维持
- [x] 文章管理 - 增删改查，富文本处理，图片上传，基本数据填写等
- [x] 标签管理

### 博客前端计划
- [x] 首页文章列表
- [x] 文章内容页
- [x] 关于
- [x] 其他

## 使用
| 目录 | 项目 |
| - | - |
| backend | 后端接口 |
| blog-web | 博客 |
| frontend | 后台管理系统 |

### 数据库初始化
安装好 MySQL 后，通过执行 `backend/init.sql` 来初始化(创建)数据表

### 启动后端接口服务
在 `backend` 目录下执行以下命令来安装依赖，并启动服务，`dev` 命令会自动通过 prisma 初始化 prisma 配置与数据表信息同步
```shell
yarn 
yarn dev
```

### 启动后台系统
在 `frontend` 目录下执行以下命令来安装依赖并启动
```shell
yarn
yarn dev
```

### 启动博客主项目
在 `blog-web` 下执行以下命令来安装依赖并启动
```shell
npm i
npm run dev
```

博客界面借鉴自 [Paranoid_K](https://github.com/pengtikui) 大佬

## 截图
![blog-1](https://raw.githubusercontent.com/iizyd/express-blog/main/pic/blog-1.png)

![blog-2](https://raw.githubusercontent.com/iizyd/express-blog/main/pic/blog-2.png)

![blog-3](https://raw.githubusercontent.com/iizyd/express-blog/main/pic/blog-3.png)

![frontend-1](https://raw.githubusercontent.com/iizyd/express-blog/main/pic/frontend-1.png)

![frontend-2](https://raw.githubusercontent.com/iizyd/express-blog/main/pic/frontend-2.png)

![frontend-3](https://raw.githubusercontent.com/iizyd/express-blog/main/pic/frontend-3.png)

![frontend-4](https://raw.githubusercontent.com/iizyd/express-blog/main/pic/frontend-4.png)
