const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()

// 解析 POST 请求的请求体
app.use(bodyParser())

router.get('/', ctx => {
  ctx.body = 'Hello Koa2'
})

// GET 请求
router.get('/get', ctx => {
  const query = ctx.query
  console.log('请求参数为', query)
  ctx.body = 'Hello Koa2'
})

// POST 请求
router.post('/post', ctx => {
  const body = ctx.request.body
  console.log('请求参数为', body)
  ctx.body = 'Hello Koa2'
})

// 将路由注册到应用
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, (err) => {
  if (err) {
    console.log(`服务器运行失败，失败原因是：${err}`)
  } else {
    console.log('服务器运行成功，点击打开 http://localhost:3000')
  }
})
