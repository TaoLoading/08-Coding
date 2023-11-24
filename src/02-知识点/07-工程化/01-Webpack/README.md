# Webpack

## webpack.config.js

常用配置项：

1. mode：指定开发/生产模式
2. entry：指定入口文件
3. output：指定输出路径
4. module：配置模块的加载和转换规则
5. plugins：配置插件。用于扩展 webpack 功能
6. devServer：开发服务器
7. resolve：配置模块解析的规则，包括设置模块的搜索路径、配置别名等
8. optimization：配置优化相关的选项，包括代码分包、压缩等
9. devtool：配置源代码映射方式

## loader

### 作用

webpack 本身只能处理 JavaScript 和 JSON 文件，针对其他文件可以使用 loader 将其转换为 webpack 可以处理的模块

### 使用

在 module 中配置，使用多个 loader 时，loader 的执行顺序为从下到上，从右到左

```js
module: {
  rules: [
    {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            // 图片名称
            name: '[name].[contenthash].[ext]',
            // 图片打包的路径
            outputPath: 'images'
          }
        }
      ]
    }
  ]
}
```

### 常用的 loader

1. babel-loader：将 ES6+ 的 JavaScript 代码转换为 ES5 兼容的代码
2. css-loader：解析 css 文件中的 @import 和 url 语句，处理 css-modules，并将结果作为一个 js 模块返回
3. sass-loader：将 Sass 或 Scss 文件转换为 CSS
4. file-loader：处理文件，将文件复制到输出目录，并返回文件的 URL 路径

## plugins

### 作用

用于扩展 webpack 功能，主要包括：

1. 打包优化：插件可以对打包结果进行优化，如压缩代码、去除注释、提取公共模块等，以改善性能和加载速度
2. 资源管理：插件可以帮助管理项目中的静态资源，如复制文件、生成 HTML 文件、处理图像等
3. 环境变量注入：插件可以向构建过程中注入环境变量或全局变量，以便在代码中使用
4. 执行自定义任务：插件可以执行任意自定义任务，如执行特定的脚本、生成报告等

### 使用

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
      filename: 'index.html'
    })
  ]
}
```

### 常用的 plugin

1. MiniCssExtractPlugin：对 css 文件进行代码分包
2. SplitChunksPlugin：对 js 文件进行代码分包
3. CleanWebpackPlugin：打包前清理输出目录，保证每次都是最新的打包文件

### loader 和 plugin 的区别

loader 是用于处理文件内容的转换；而 plugin 是用于丰富 webpack 的功能，如优化输出结果、资源管理、注入环境变量等，可以在 webpack 不同的生命周期阶段执行特定的功能

## SourceMap

### 作用

SourceMap 是一个映射文件，提供了一种映射关系，用于将打包后的代码行与源代码行进行对应，从而使开发者能够在浏览器中准确地定位源代码 

### 使用

```js
module.exports = {
  devtool: 'source-map'
}
```

不止 source-map 这一个值，还有多个比如 cheap-module-eval-source-map 等，适当使用可提升打包速度。推荐使用：

1. 开发环境：cheap-module-eval-source-map
2. 生成环境：cheap-module-source-map

## Babel

### 作用

Babel 是一个广泛使用的 JavaScript 编译器，它的主要作用是将新版本的 JavaScript 代码转换为兼容的旧版本代码，以便在不支持最新语法和功能的浏览器或环境中运行

### 原理

Babel 工作原理主要分为三个阶段：解析（Parsing）、转换（Transformation）、和代码生成（Code Generation）

1. **解析**：在这个阶段，Babel 将源代码字符串转换成一个抽象语法树，有以下两步：
   1. **词法分析（Lexical Analysis）**：代码被分解成词法单元（tokens），这些 tokens 是代码的最小单位，如关键字、运算符、数字等
   2. **语法分析（Syntactic Analysis）**：根据这些 tokens 构建出 AST。AST 是一个树形结构，代表了代码的语法结构
2. **转换**：Babel 接着对 AST 进行遍历，并根据指定的规则或插件对其进行修改。这些转换可能包括：
   1. 将新的 JavaScript 语法（如 ES6）转换为旧的语法（如 ES5）
   2. 应用特定的转换逻辑，如优化代码、移除不必要的代码等
   3. 这个过程是高度可配置的，主要通过插件和预设来控制
3. **代码生成**：Babel 将转换后的 AST 再次转换成普通的 JavaScript 代码字符串

### 使用

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env'] // 使用 preset-env 转换代码，可能会导致转换不全
            presets: [
              [
                '@babel/preset-polyfill',
                {
                  'useBuiltIns': 'usage' // 使用 polyfill 并按业务代码去引入 polyfills。注意此时应该已在入口文件引入 polyfills
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
```

### @babel/preset-env 和 @babel/polyfill 的区别

1. @babel/preset-env 只转换语法，并不处理新的 API

2. @babel/polyfill 是一个用于转换新的 API，如 Promise、Array.from、Object.assign 等

   **注：** 在 Babel 7.4.0 版本之后，@babel/polyfill 被弃用。官方建议直接使用 core-js 和 regenerator-runtime 来替代，因为 @babel/polyfill 本质上是这两个库的集合

### .babelrc

.babelrc 文件内就是 babel-loader 中 options 的内容

## Tree shaking

### 作用

Tree shaking 是一种优化技术，用于打包时移除项目中未被使用的代码，以减小打包文件的体积

### 原理

通过静态分析代码，从入口文件开始追踪代码的依赖关系，标记未使用的代码，最后通过构建工具将未使用的代码从构建输出中删除

### 注意

Tree shaking 只支持 ES Module 的引入方式

### 使用

#### 开发环境

1. 配置 optimization

   ```js
   module.exports = {
     optimization: {
       usedExports: true
     }
   }
   ```

2. 在 package.json 中设置 sideEffects

   ```json
   {
     "sideEffects": ["*.css", "@xxx"] // 表示对哪些文件不做处理，没有限制时为 false
   }
   ```

#### 生产环境

无需配置自动开启 Tree shaking

## Code Splitting（代码分包）

### 概念

代码分包（Code splitting）是一种将应用程序的代码分包成多个较小文件的技术，有助于优化应用程序的加载性能

### Webpack 中使用代码分包

1. 方式 1：无需配置实现代码分包（只针对异步导入的代码）

   ```js
   import('./module')
     .then(module => {
       // 使用加载的模块
     })
     .catch(error => {
       // 处理加载失败的情况
     })
   ```

2. 方式 2：使用 MiniCssExtractPlugin 和 SplitChunksPlugin 插件实现代码分包

   1. MiniCssExtractPlugin：用于将 CSS 代码从打包生成的 JavaScript 文件中提取出来，生成独立的 CSS 文件

      ```js
      const MiniCssExtractPlugin = require('mini-css-extract-plugin');
      
      module.exports = {
        module: {
          rules: [
            {
              test: /\.css$/,
              use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
          ]
        },
        plugins: [new MiniCssExtractPlugin()]
      }
      ```

   2. SplitChunksPlugin：用于将公共的 js 模块（包括代码和依赖）提取出来，生成单独的文件，用于缓存和复用（同步异步都可，配置 chunks）

      ```js
      module.exports = {
        optimization: {
          splitChunks: {
            chunks: 'all',
            // 下列配置可不显式配置，使用默认项即可
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
              defaultVendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                reuseExistingChunk: true
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
              }
            }
          }
        }
      }
      ```

## 懒加载

### 概念

懒加载是一种优化技术，用于延迟加载模块，直到其真正需要使用时才进行加载

### 使用

异步引入模块即可实现懒加载

```js
import('./module')
  .then(module => {
    // 使用加载的模块
  })
  .catch(error => {
    // 处理加载失败的情况
  })

// 或

async function getModule() {
  const xxx = await import('./module')
}
```

## webpackPrefetch 和 webpackPreload

### webpackPrefetch

#### 概念

prefetch（预取）用于在浏览器**空闲时**提前加载某些资源

#### 使用

```js
import(/* webpackPrefetch: true */ './myModule.js')
```

### webpackPreLoad

#### 概念

preload（预加载）用于在当前页面**加载完成后**，预加载其他页面可能需要的资源

#### 使用

```js
import(/* webpackPreload: true */ './myModule.js')
```

## 手写 loader

### 实现 loader

```js
/**
 * 自定义 loader：文本转大写
 * @param {*} source 源代码
 * @param {*} map 源映射。转换后的代码和原始代码之间的映射关系
 * @param {*} meta 元数据。当前模块相关的额外信息
 */
module.exports = function (source, map, meta) { // 不可使用箭头函数，因为 webpack 会对 this 进行处理以获取某些方法或变量
  const uppercaseText = source.toUpperCase()
  return uppercaseText
}
```

### 使用 loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/, // 匹配的文件类型
        use: [
          {
            loader: path.resolve(__dirname, '自定义 loader 的路径')
          }
        ]
      }
    ]
  }
}
```

## 手写 plugin

### 实现 plugin

```js
/**
 * 自定义 plugin：打包完成后生成一个版权文件
 */
const fs = require('fs')

class CopyrightPlugin {
  constructor(options) {
    // 插件的配置选项
    this.options = options
  }

  /**
   * apply() 是插件的入口点，webpack 在启动时会调用该方法
   * @param {*} compiler // webpack 的实例。包含了 webpack 的配置信息、各种钩子函数以及其他与构建相关的功能
   */
  apply(compiler) {
    compiler.hooks.done.tap('CopyrightPlugin', (stats) => {
      const { output } = stats.compilation.options
      const { author, year } = this.options

      const content = `/**\n * Copyright (c) ${year} ${author}\n */`

      fs.writeFileSync(`${output.path}/copyright.txt`, content)
    })
  }
}

module.exports = CopyrightPlugin
```

### 使用 plugin

```js
const CopyrightPlugin = require('自定义 loader 的路径')

module.exports = {
  plugins: [
    new CopyrightPlugin({
      author: 'TaoLoading',
      year: '2023'
    })
  ]
}
```

## 打包流程与原理

1. **初始化**：启动构建，读取和合并参数，加载插件，执行初始化生命周期的方法
2. **编译**：从 entry 开始，对每个模块串行调用对应的 loader 将其转化为 AST（抽象语法树），找出每个文件的依赖，形成依赖树
3. **输出**：对依赖树进行深度优先遍历，将每个模块转化为可执行的代码，然后合并成一个文件，添加到输出列表
4. **确定入口**：根据配置中的 entry 找出所有的入口文件
5. **编译模块**：从入口文件出发，调用所有配置的 loader 对模块进行翻译，再找出该模块依赖的模块，递归此步骤直到所有入口依赖的文件都经过了本步骤的处理
6. **完成模块编译**：在经过第 5 步使用 loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
7. **输出资源**：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
8. **输出完成**：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

## 模块联邦

模块联邦（Module Federation）允许开发者将应用拆分成可共享的部分，并在多个应用之间动态地加载这些部分。这种方式可以在不同的前端应用程序之间实现代码的共享和重用，从而大大提高了开发效率和应用的灵活性。在 Webpack 5 中首次引入
