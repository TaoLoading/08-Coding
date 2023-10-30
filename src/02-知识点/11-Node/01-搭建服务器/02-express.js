const express = require('express')

const app = express()

// 获取请求参数
// 将请求体中的 JSON 数据或 urlencoded 编码解析为 JavaScript 对象
app.use(express.json())
app.use(express.urlencoded())

router.get('/', (req, res) => {
  res.send('Hello Express!')
})

// GET 请求
app.get('/get', (req, res) => {
  console.log('请求参数为', req.query)
  res.send('Hello Express!')
})

// POST 请求
app.post('/post', (req, res) => {
  const data = req.body
  console.log('请求参数为', data)
  res.json(data)
})

app.listen(3000, (err) => {
  if (err) {
    console.log(`服务器运行失败，失败原因是：${err}`)
  } else {
    console.log('服务器运行成功，点击打开 http://localhost:3000')
  }
})
