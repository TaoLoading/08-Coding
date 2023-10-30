# 模块化

## CommonJS

### 用法

1. 导入

   ```js
   const module1 = require('xxx')
   ```

2. 导出

   ```js
   // 写法一
   module.exports = module1
   
   // 写法二
   exports.module1 = 值
   ```

### 应用场景

Node.js

## ES6 Module

### 用法

1. 导入

   ```js
   // 命名导入（对应命名导出）
   import { module1 } from 'xxx'
   
   // 默认导入（对应默认导出）
   import module1 from 'xxx'
   
   // 命名导入并重命名
   import { module1 as m1 } from './otherModule'
   ```

2. 导出

   ```js
   // 命名导出
   export const module1 = 值
   export function moduleFunction() { }
   
   // 默认导出
   const module1 = 值
   export default module1
   ```

### 应用场景

大部分前端开发场景

## AMD

RequireJS 在推广过程中对模块定义的规范化产出，使用极少，不再阐述
