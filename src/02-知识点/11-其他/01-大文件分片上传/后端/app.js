const http = require('http')
// 中间件，处理 FormData 对象的中间件
const multiparty = require('multiparty')
const path = require('path')
const fse = require('fs-extra')

const server = http.createServer()
// 获取根目录下 largeFileUpload 文件夹的路径，用于下文存放切片
const UPLOAD_DIR = path.resolve(__dirname, '.', 'largeFileUpload')

server.on('request', async (req, res) => {
  // 处理跨域问题，允许所有的请求头和请求源
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')

  if (req.url === '/upload') {
    // 解析 FormData 对象
    const multipart = new multiparty.Form()
    multipart.parse(req, async (err, fields, files) => {
      if (err) {
        return
      }

      const [file] = files.file
      const [fileName] = fields.fileName
      const [chunkName] = fields.chunkName

      const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`)
      // 文件夹不存在，新建该文件夹
      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirs(chunkDir)
      }

      // 把切片移动进 chunkDir
      await fse.move(file.path, `${chunkDir}/${chunkName}`)
      res.end(JSON.stringify({
        code: 0,
        message: '切片上传成功'
      }))
    })
  }
})

server.listen(3000, () => {
  console.log('服务已启动')
})
