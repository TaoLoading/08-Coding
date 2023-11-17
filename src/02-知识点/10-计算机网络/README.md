# 计算机网络

## 1. 什么是 HTTP

### 概念

`HTTP (HyperText Transfer Protocol)`，即超文本传输协议，是一种实现网络通信的规范。它定义了客户端和服务器之间交换报文的格式和方式，默认使用的是 80 端口，其底层使用 TCP 作为传输层协议，保证了数据传输的可靠性

### 特点

1. 简单快速：客户端向服务器请求服务时，只需传送请求方法和路径
2. 灵活：HTTP 允许传输任意类型的数据对象
3. 无连接：限制每次连接只处理一个请求。服务器处理完客户端请求并收到客户端应答后，即断开连接
4. 无状态：HTTP 协议无法根据之前的状态进行本次的请求处理
5. 明文：HTTP 是以明文的形式传递内容

## 2. HTTP 和 HTTPS 的区别

### HTTPS

HTTPS 是 HTTP 协议的安全版本，让 HTTP 运行安全的`SSL/TLS`协议上，即 `HTTPS = HTTP + SSL/TLS`，从而实现对传输的数据实现加密

### 区别

1. 安全性：HTTPS 使用 SSL/TLS 协议进行加密，而 HTTP 协议的数据传输是明文的
2. 成本：HTTPS 需要用到 CA 机构颁发的证书
3. SEO：随着浏览器对安全性的逐渐重视，HTTPS 更利于 SEO
4. 端口号：HTTPS 默认使用 443 端口，HTTP 默认使用 80 端口

## 3. HTTP 1.0 和 HTTP 1.1 的区别

1. 连接：1.0 非持久连接；1.1 允许多个请求和响应复用同一个 TCP 连接，实现持久连接，减少了建立和关闭连接的次数，从而降低了延迟

2. 缓存：1.1 引入了更多的缓存控制策略，如增加了`Etag`、`If-Unmodified-Since`、`If-Match`、`If-None-Match`等缓存头

3. 资源请求：1.0 存在带宽浪费的情况，比如客户端只需要某个资源对象的一部分，而服务器却将整个对象返回；1.1 增加了`range` 请求头，它允许只请求资源的某个部分，即返回码是 `206（Partial Content）`。可用于断点续传，例如如果客户端之前下载了文件的前 500 字节，现在想要继续下载接下来的部分，可以发送类似于 `Range: bytes=500-` 的请求头

   ```
   示例：
   GET /path/to/resource HTTP/1.1
   Host: example.com
   Range: bytes=500-
   ```

4. host：1.1 增加了 host 请求头，用于指定服务器的域名

5. 请求方法：1.1 增加了`put`、`delete`等请求方法

## 4. HTTP 1.1 和 HTTP 2.0 的区别

1. 二进制协议：1.1 的报文的头信息必须是文本（ASCII 编码），数据体可以是文本或二进制；2.0 则是一个彻底的二进制协议，头信息和数据体都是二进制

2. 多路复用：2.0 增加了多路复用，使得客户端和服务器都可以同时发送多个请求或回应，而且不用按照顺序一一发送，避免了**队头堵塞**的问题。

   ````
   队头阻塞：在 HTTP 1.1 中，每个请求都需要在一个连接上按照顺序传输。如果一个请求的响应时间较长，后续的请求必须等待前一个请求的完成才能开始传输。这种情况下，即使其他请求已经准备好发送，也会被阻塞，无法立即传输
   
   数据流：因为 HTTP 2.0 的数据包是不按顺序发送的，同一个连接里连续的数据包可能属于不同的请求。HTTP 2.0 将每个请求或回应的所有数据包称为一个数据流，每个数据流都有一个独一无二的编号
   ````

3. 头部压缩：2.0 增加了头部压缩，对请求头和响应头进行压缩，提高了性能

4. 服务器推送：2.0 增加了服务器推送，允许允许服务器主动向客户端推送与当前请求相关的资源，从而减少客户端的请求

## 5. 多路复用

### HTTP 2.0 中的多路复用

HTTP 2.0 中引入帧（frame）和流（stream）的概念，帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。多路复用使得一个 TCP 连接可以存在多个流，也就是可以发送多个请求或响应的消息，并且不需要按照顺序一一对应，避免了队头堵塞的问题

### 为什么 HTTP 1.1 不能实现多路复用

HTTP 1.1 采用文本传输而非二进制传输，没有帧和流的概念，在发送多个请求时，服务端不能区分每个响应对应的请求，故无法实现多路复用

## 6. 状态码

### 状态码意义

1. `1xx`：请求已被接受，需要继续处理
2. `2xx`：请求成功
3. `3xx`：重定向
4. `4xx`：客户端错误
5. `5xx`：服务端错

### 常用状态码

1. `200`：请求成功，返回了所需数据
2. `201`：请求成功，服务器创建了新的资源
3. `301`：**永久重定向**，请求的资源已被永久的移动到新 URL，返回信息会包括新的 URL，浏览器会自动定向到新 URL
4. `302`：**临时重定向**，请求的资源已被临时的移动到新 URI，客户端应继续使用原有 URL
5. `304`：**命中了协商缓存**，所请求的资源未修改，本次获取到的内容是缓存中的数据
6. `400`：客户端请求的语法错误，服务端无法理解
7. `401`：请求需要进行身份验证
8. `403`：禁止访问，服务器拒绝请求
9. `404`：服务器没有找到相应资源
10. `500`：服务器遇到错误，无法完成对请求的处理
11. `502`：作为代理或网关的服务器从上游服务器接收到一个无效的响应
12. `503`：服务器无法使用
13. `504`：作为代理或网关的服务器未能从上游服务器接收到响应，响应超时

### 304 多了好还是少了好

304 命中了协商缓存，所请求的资源未修改，对于页面加载速度的提升 304 有好处；但 304 同时也代表页面未更新，搜索引擎更青睐更新频繁的网站，所以对于 SEO 太多的 304 没有好处

### 实现 304

1. 请求头中加入`If-Modified-Since`或者`If-None-Match`字段，标记资源上次修改时间
2. 服务器端拿到后进行比对，没变则返回 304，变化则返回资源

## 7. GET 请求和 POST 请求的区别

1. 参数位置：GET 请求的参数是放在 URL 中；POST 请求放在 body 中
2. 参数长度：由于浏览器对 URL 长度有限制，导致 GET 请求的参数有长度限制；POST 没有限制
3. 安全：POST 请求相比 GET 请求相对而言更安全，因为数据在地址栏上不可见
4. 缓存：GET 请求会被浏览器缓存；POST 不会
5. 幂等性：GET 请求是一个幂等的请求；POST 不是（幂等，指同⼀个请求⽅法执⾏多次和仅执⾏⼀次的效果完全相同）

## 8. POST 请求为什么发两次请求

这是因为在发送正式请求前使用 OPTIONS 方法进行了一次`预检请求`，以获取服务器是否允许发送正式请求。如下情况会触发`预检请求`：

1. 自定义请求头
2. 跨域请求
3. 使用了非 GET/POST 方法

## 9. 跨域

### 同源策略

同源策略（Same-Origin Policy）是一种浏览器安全机制，用于限制不同源之间的访问。同源策略要求同协议、同域名、同端口号

### 解决跨域

1. JSONP：利用`<script>`标签的请求不受同源策略限制的特性，但只支持 get 请求

   ```html
   <script>
     function jsonpCallback(data) {
       console.log('Data from server: ', data)
     }
   </script>
   <script src="http://example.com/data?callback=jsonpCallback"></script>
   ```

2. CORS（跨源资源共享）：在服务器端设置`Access-Control-Allow-Origin`响应头，允许来自不同源的请求

   ```js
   // 以 node.js 为例
   const express = require('express')
   const app = express()
   
   app.use((req, res, next) => {
       res.header('Access-Control-Allow-Origin', '*')
       res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
       next()
   })
   ```

3. 代理服务器（devServer、nginx）

4. postMessage 跨标签通信

   ```js
   // 页面 A
   window.onload = function() {
     const win = window.open('http://example.com/pageB', 'pageB')
     win.postMessage('Hello from Page A!', 'http://example.com') // 发送消息语法：targetWindow.postMessage(message, targetOrigin)
   }
   
   // 页面 B
   window.addEventListener('message', function(event) {
     console.log('Message received:', event.data) // 接收消息语法：event.data
     // 可以回复消息
     event.source.postMessage('Hello from Page B!', event.origin)
   }, false)
   ```

## 10. 请求与响应

### 请求头

请求头包含了关于请求的元数据，如客户端信息、所需内容类型、认证信息等。。常见的请求头包括`Content-Type`（请求体的媒体类型）、`Accept`（客户端可接受的响应媒体类型）、`Authorization`（认证信息）等

```apache
GET /path/file.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
```

### 请求体

请求体包含了发送给服务器的数据。在 GET 请求中通常为空，而在 POST、PUT 等请求中用于携带数据

```js
{
  "username": "username",
  "password": "password"
}
```

### 响应头

响应头包含了服务器对请求的响应的元数据，如响应的状态码、内容类型、服务器信息等。常见的响应头有`Content-Type`（响应体的媒体类型）、`Content-Length`（响应体的长度）等

```apache
HTTP/1.1 200 OK
Date: Mon, 23 May 2005 22:38:34 GMT
Server: Apache/1.3.3.7 (Unix) (Red-Hat/Linux)
Last-Modified: Wed, 08 Jan 2003 23:11:55 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 131
Connection: close
```

### 响应体

响应体是服务器返回的实际数据。这可能是 HTML 文档、JSON 对象、二进制文件等

```html
<!DOCTYPE html>
<html>
<head>
    <title>Example Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
```

## 11. CDN 原理

CDN（内容分发网络，Content Delivery Network）的原理是基于将内容分布到多个地理位置分散的服务器上，根据网络情况和距用户的距离，将请求重新导向离用户最近的服务节点上，以加快访问速度

## 12. 缓存机制

浏览器缓存主要分为强缓存和协商缓存两种形式，可以减少请求次数，减轻服务器压力

### 强缓存

强缓存是指浏览器在缓存资源时不需要向服务器发送请求来确认资源的状态。使用`Cache-Control`实现

### 协商缓存

当强缓存失效后，浏览器携带缓存标识向服务器发送请求，由服务器来决定是否使用缓存

### 低版本 IE 中存在的缓存问题

低版本 IE 中 Ajax 存在严重缓存问题，即在请求地址不发生变化的情况下，只有第一次请求会发送到服务器，后续请求是读取这个缓存。解决办法是在请求地址后面加随机数，使得请求地址变化

## 13. 五层网络模型

1. 应用层：负责为网络应用软件提供服务，构建用户和网络之间的接口。包括 HTTP（网页浏览）、FTP（文件传输）、SMTP（邮件传输）等
2. 传输层：负责提供进程与进程之间的数据传输。包括 TCP（传输控制协议，提供可靠的、面向连接的服务）和 UDP（用户数据报协议，提供无连接的服务）
3. 网络层：负责数据包的路由选择和转发。包括 IP（互联网协议，负责寻址和路由选择）等
4. 数据链路层：负责在相邻节点间的可靠传输。包括以太网（Ethernet）等
5. 物理层：负责在物理媒介上实现原始比特流的传输。包括电缆、光纤、无线电波等

## 14. TCP 和 UDP

TCP（传输控制协议）和 UDP（用户数据报协议）是网络通信中两种非常重要的协议，它们都位于传输层。有以下区别：

1. **连接方式**：TCP 是面向连接的；UDP 是无连接的
2. **可靠性**：TCP 是可靠的，它通过确认和重传机制保证数据的正确传输；UDP 是不可靠的
3. **头部开销**：TCP 的头部开销比 UDP 大，因为它需要更多的信息来维护可靠性和连接状态
4. **数据传输方式**：TCP 是流式传输，数据没有明确边界；UDP 是以数据报为单位的传输，每个数据报都有明确的边界
5. **速度和效率**：TCP 由于其可靠性机制，速度较慢；UDP 由于其轻量级和无需建立连接的特点，速度更快
