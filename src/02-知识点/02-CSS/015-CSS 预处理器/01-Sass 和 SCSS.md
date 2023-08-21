# Sass/SCSS

## 作用

1. 声明变量：Sass/SCSS 允许使用变量来存储和复用样式中的值。使用变量可以提高代码的可维护性和灵活性，可以在多个地方使用同一变量，方便进行样式调整。例如：

   ```css
   $primary-color: #ff0000;
   
   .container {
     background-color: $primary-color;
   }
   ```

2. 嵌套规则：Sass/SCSS 允许在选择器中嵌套其他选择器，从而可以更清晰地表示元素之间的层级关系。这样可以减少代码的重复，并使样式表更易于阅读和维护。例如：

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

3. 混合样式（Mixins）：Sass/SCSS 提供了混合的概念，可以定义一组样式规则，并在需要时进行复用。混合类似于函数，可以接受参数，并生成相应的样式。这样可以减少重复的代码块，提高样式表的可维护性。例如：

   ```css
   @mixin button($background-color, $text-color) {
     background-color: $background-color;
     color: $text-color;
     padding: 10px;
   }
   
   .button {
     @include button(#ff0000, #ffffff);
   }
   ```

4. 继承（Extend）

   ```css
   .error-message {
     color: #ff0000;
     font-weight: bold;
   }
   
   .warning-message {
     @extend .error-message;
     color: #ff9900;
   }
   ```

5. 导入

   ```css
   // _variables.scss
   $primary-color: #ff0000;
   
   // main.scss
   @import 'variables';
   
   .container {
     background-color: $primary-color;
   }
   ```

## 区别

1. 语法格式（区别最大）：Sass 使用了严格的缩进代替代码块和分号，而 SCSS 使用了类似 CSS 的大括号和分号
2. 兼容性：SCSS 使用了与 CSS 类似的语法，兼容性优于 Sass
3. 后缀
