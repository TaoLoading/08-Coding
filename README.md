# 算法及前端面试题的代码实现

## 项目介绍

本项目包含了数据结构基础、算法题和前端面试题的代码实现，项目使用 Webpack 打包，可通过引用的形式执行特定文件，主要针对 js/ts 源码与单元测试部分代码

## 使用方法

1. 安装依赖
2. 在` src/index.ts`文件内引入想要执行的代码文件`（js/ts）`
3. 执行 `yarn dev` 运行项目，等待打包完毕
4. 访问 `localhost:3000 `，查看浏览器 `console` 中的代码执行结果
5. 针对单元测试部分代码，执行 `npx jest` 代码路径 运行

## 核心文件

```js
src
├── 00-数据结构基础
├── 01-算法
├── 02-前端面试题
```

## 近期目标

- [ ] 补充前端面试题
- [ ] 完善文档说明
- [ ] 将打包工具升级为 Vite 并精简项目架构