const http = require('http')
const url = require('url')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/get') {
    const urlObj = url.parse(req.url)
    const queryObj = querystring.parse(urlObj.query)
    console.log('请求参数为', queryObj)

    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello Node!')
  } else if (method === 'POST' && url === '/post') {
    let body = ''
    req.on('data', (data) => {
      body += data
    })
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      console.log('请求参数为', body)
      res.end('Hello Node!')
    })
  }
})

server.listen(3000, (err) => {
  if (err) {
    console.log(`服务器运行失败，失败原因是：${err}`)
  } else {
    console.log('服务器运行成功，点击打开 http://localhost:3000')
  }
})
