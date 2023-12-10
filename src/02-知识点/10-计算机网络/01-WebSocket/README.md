# WebSocket 

## 概念

WebSocket 是基于 TCP 的一种新的应用层网络协议，实现了浏览器与服务器全双工通信，即允许服务器主动发送信息给客户端

## 作用

在 WebSocket 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输，客户端和服务器之间的数据交换变得更加简单。

## 特点

1. 建立在 TCP 协议之上，服务器端的实现比较容易
2. 与 HTTP 协议有着良好的兼容性。默认端口也是 80 和 443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器
3. 数据格式比较轻量，性能开销小，通信高效
4. 可以发送文本，也可以发送二进制数据
5. 没有同源限制，客户端可以与任意服务器通信
6. 协议标识符是`ws`（如果加密，则为`wss`），服务器网址就是 URL

## 应用场景

1. 即时聊天通信
2. 多玩家游戏
3. 弹幕
4. ......

## WebSocket 与 HTTP 的区别

1. 通信模式
   1. HTTP 是单向的，客户端发起请求，服务器做出响应
   2. WebSocket 是双向通信协议，客户端和服务器都可以主动发起请求给对方
2. 持久性
   1. HTTP 连接（在非持久连接中）用完即关闭
   2. WebSocket 建立了客户端和服务之间的持久连接
3. 连接开销
   1. HTTP 每次请求都需要建立新的连接，连接开销较大
   2. WebSocket 的连接是持久的，连接开销较小

## 使用

### 前端

```js
// 创建 WebSocket 连接
const socket = new WebSocket('ws://localhost:3000')

// 成功建立连接时的回调函数
socket.onopen = function () {
  console.log('WebSocket 连接已建立')

  // 向服务器发送消息
  socket.send('Hello, Server!')
}

// 接收到服务器消息时的回调函数
socket.onmessage = function (event) {
  console.log('接收到服务器消息：', event.data)

  // 关闭连接
  socket.close()
}

// 连接关闭时的回调函数
socket.onclose = function () {
  console.log('WebSocket 连接已关闭')
}
```

### 后端

```js
const server = app.listen(3000, () => {
  console.log('服务已启动')
})

// 将 webSocket 服务器绑定到 express 服务器
const wss = new WebSocket.Server({ server })

// webSocket 连接的处理逻辑
wss.on('connection', function (ws) {
  console.log('客户端已连接')

  ws.on('message', function (message) {
    console.log('接收到客户端消息：', message)

    // 向客户端发送消息
    ws.send('Hello, Client!')

    setTimeout(function () {
      ws.send('5s 后来自服务器主动发送的消息')

      // 关闭连接
      socket.close()
    }, 5000)
  })

  ws.on('close', function () {
    console.log('客户端已断开连接')
  })

  ws.send('来自服务器主动发送的消息')
})
```
