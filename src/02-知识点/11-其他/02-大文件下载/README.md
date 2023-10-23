# 大文件下载

## 原理

HTTP请求中，`Range 首部`可以允许客户端请求服务器返回文件的指定范围，而不是整个文件，可以实现大文件分片下载

请求头示例：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba1b5492ddda478fbbe94548d00b0259~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## 思路

1. 获取文件总体大小
2. 计算分块数量及对应的文件下载范围
3. 并发下载

## 参考

1. [大文件下载1](https://juejin.cn/post/7195375123233243196?searchId=20231023102350271BE94C7EE73C1AA27D#heading-6)
2. [大文件下载2](https://juejin.cn/post/6954868879034155022?searchId=20231023102350271BE94C7EE73C1AA27D)
