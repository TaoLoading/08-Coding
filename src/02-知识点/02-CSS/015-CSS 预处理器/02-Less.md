# Less

## 作用

1. 声明变量：Less 允许使用变量来存储和复用样式中的值。使用变量可以简化样式的修改和维护，可以在多个地方使用同一变量。例如：

   ```css
   @primary-color: #ff0000;
   
   .container {
     background-color: @primary-color;
   }
   ```

2. 嵌套规则：Less 允许在选择器中嵌套其他选择器，从而可以更清晰地表示元素之间的层级关系。这样可以减少代码的重复，并使样式表更易于阅读和维护。例如：

   ```css
   .container {
     background-color: #fff;
   
     h1 {
       color: #ff0000;
     }
   
     p {
       font-size: 14px;
     }
   }
   ```

3. 混合（Mixins）：Less 提供了混合的概念，类似于函数，可以定义一组样式规则，并在需要时进行复用。混合可以接受参数，并生成相应的样式。这样可以减少重复的代码块，提高样式表的可维护性。例如：

   ```css
   .button(@primary-color) {
     background-color: @primary-color;
     color: #ffffff;
     padding: 10px;
   }
   
   .button {
     .button(#ff0000);
   }
   ```

4. 导入：Less 允许将多个样式文件合并为一个文件，并使用@import 指令引入其他样式文件。这样可以组织和管理样式文件，提高代码的可维护性。例如：

   ```css
   // variables.less
   @primary-color: #ff0000;
   
   // main.less
   @import 'variables.less';
   
   .container {
     background-color: @primary-color;
   }
   ```

## 与 SCSS 的区别

1. **变量声明时使用的符号**：SCSS 使用$，Less 使用@
2. **变量插值（在代码中动态地嵌入变量的值）**：Less 采用@{XXXX}的形式，SCSS 采用${XXXX}的形式
3. **条件语句的支持**：SCSS 可以使用 if/for 的条件语句，Less 不支持
   
4. **应用外部 css 文件**：SCSS 应用的 css 文件名必须以‘_’开头（下划线），文件名如果以下划线开头的话，sass 会认为该文件是一个应用文件，不会进一步处理，如：

   ```css
   @import "_main.css";
   @import "_layout.css";
   @import "_text.css";
   ```
   
5. **编译**：
   
   1. Less 使用 Less 编译器编译成 CSS 文件
   2. SCSS 使用 SASS 编译器或 Node-sass 编译成 CSS 文件。SASS 编译器或 Node-sass 赖于 Node 来执行编译任务，在不同的 Node 版本之间存在一些兼容性问题

## 注意

**Sass/SCSS/Less都不能在浏览器中直接运行**
