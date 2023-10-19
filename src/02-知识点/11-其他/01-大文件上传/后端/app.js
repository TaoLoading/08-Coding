const express = require('express')
// 中间件，处理 FormData 对象
const multiparty = require('multiparty')
// 中间件，处理跨域
const cors = require('cors')
const path = require('path')
const fse = require('fs-extra')

const app = express()

app.use(cors({
  origin: '*'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 获取根目录下 largeFileUpload 文件夹的路径，用于下文存放切片
const UPLOAD_DIR = path.resolve(__dirname, '.', 'largeFileUpload')

// 用于存放所有上传文件 hash 值的数组
let hashArr = []
// 用于存放本次上传文件 hash 值的数组
let hashNowArr = []

// 上传
app.post('/upload', (req, res) => {
  // 解析 FormData 对象
  const multipart = new multiparty.Form()
  multipart.parse(req, async (err, fields, files) => {
    if (err) {
      return
    }

    const [file] = files.file
    const [fileName] = fields.fileName
    const [chunkName] = fields.chunkName
    const [hash] = fields.hash

    const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`)
    // 文件夹不存在，新建该文件夹
    if (!fse.existsSync(chunkDir)) {
      await fse.mkdirs(chunkDir)
    } else if (hashArr.indexOf(hash) !== -1) {
      // hash 值相同则切片文件存在，不做处理
      return res.send(JSON.stringify({
        code: 0,
        message: '切片上传成功'
      }))
    }

    // 把切片移动进 chunkDir
    await fse.move(file.path, `${chunkDir}/${chunkName}`)
    hashArr.push(hash)
    res.send(JSON.stringify({
      code: 0,
      message: '切片上传成功'
    }))
  })
})

// 合并
app.post('/merge', async (req, res) => {
  const params = req.body
  const { fileName, chunkSizeList, chunkHashList } = params
  hashNowArr = chunkHashList
  const filePath = path.resolve(UPLOAD_DIR, fileName)
  await mergeFileChunk(filePath, fileName, chunkSizeList)
  res.send(JSON.stringify({
    code: 0,
    message: '合并切片成功'
  }))
})

/**
 * 合并切片
 * @param filePath 文件路径
 * @param fileName 文件名
 * @param chunkSizeList 存放切片文件大小的数组
 */
async function mergeFileChunk(filePath, fileName, chunkSizeList) {
  const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`)

  // 读取切片目录内容
  let chunkPaths = await fse.readdir(chunkDir)
  chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1])

  // 清空本次上传文件的 hash 值
  hashArr = hashArr.filter(item => !hashNowArr.includes(item))

  const arr = chunkPaths.map((chunkPath, index) => {
    return pipeStream(
      path.resolve(chunkDir, chunkPath),
      // 在指定的位置创建可写流
      fse.createWriteStream(filePath, {
        start: chunkSizeList[0] * index,
        end: index === 0 ? chunkSizeList[index] : chunkSizeList[index - 1] + chunkSizeList[index]
      })
    )
  })
  // 保证所有的切片都被读取
  await Promise.all(arr)
}

/**
 * 将切片转换成流
 * @param path 切片文件的文件路径
 * @param writeStream 函数，在指定的位置创建可写流
 * @returns 
 */
function pipeStream(path, writeStream) {
  return new Promise(resolve => {
    // 创建可读流，读取所有切片
    const readStream = fse.createReadStream(path)
    readStream.on('end', () => {
      // 读取完毕后，删除已经读取过的切片文件
      fse.unlinkSync(path)
      resolve()
    })
    // 将可读流流入可写流
    readStream.pipe(writeStream)
  })
}

app.listen(3000, () => {
  console.log('服务已启动')
})
