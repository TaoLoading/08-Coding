# 放大图片并保证宽高比不变

1. 只设置宽或高的其中一项，另一项设置为 auto

   ```css
   img {
     width: 100%; 
     height: auto;
   }
   ```

2. 使用 zoom 或 transform: scale() 缩放图片

   ```css
   img {
     zoom: 1.5;
   }
   
   img {
     transform: scale(1.5);
   }
   ```