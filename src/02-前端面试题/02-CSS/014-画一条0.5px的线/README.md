# 画一条 0.5px 的线

1. 使用`meta viewport`

   控制缩放（存在兼容性问题）

   `<meta name="viewport" content="width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5"/>`

2. 使用`transform:scale()`

   用伪元素画出 200% 宽高的边，然后 transform scale (0.5) 缩小，然后用`pointer-events：none`去除点击/聚焦事件

   ```css
   .hr {
     border: 1px solid red;
     position: relative;
   }
   .hr::after {
     content: "";
     position: absolute;
     top: -1px;
     left: -1px;
     right: -1px;
     bottom: -1px;
     border: 1px solid red;
     transform-origin: center center;
     transform: scaleY(0.5);
   }
   ```

3. 使用`SVG`

   ```html
   <svg width="100%" height="100%">
     <line x1="10" y1="10" x2="100" y2="10" stroke="#000" stroke-width="0.5"></line>
   </svg>
   ```

   