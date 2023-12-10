# async 和 defer

## async

### 使用

```html
<script async src="async-script.js"></script>
```

### 执行时机

**立即执行**：带有 async 的脚本会在它被下载时进行异步加载，不会阻塞 HTML 的解析，并且会在加载完成后**立即执行**

### 使用场景

适合不依赖于其他脚本且不被其他脚本依赖的情况

## defer

### 使用

```html
<script defer src="defer-script.js"></script>
```

### 执行时机

**延迟执行**：带有 async 的脚本会在它被下载时进行异步加载，不会阻塞 HTML 的解析，但会在**整个文档解析和 DOM 构建完毕后才会执行**

### 使用场景

适用于那些需要访问或操作 DOM 的脚本，以及依赖于其他脚本或被其他脚本依赖的情况
