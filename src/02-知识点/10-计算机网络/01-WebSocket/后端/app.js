const express = require('express')
const WebSocket = require('ws')

const app = express()

app.get('/', function (req, res) {
  res.send('Hello, World!')
})

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
    }, 5000)
  })

  ws.on('close', function () {
    console.log('客户端已断开连接')
  })

  ws.send('来自服务器主动发送的消息')
})
