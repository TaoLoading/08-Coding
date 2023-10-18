# 分片上传

## 前端

1. 对文件使用`Blob.slice()`实现切片为小文件
2. 将每个切片信息转换为包含文件特征信息的对象，并转换为`FormData`对象用于发送请求
3. 依次将每个小文件发送到后端，使用`Promise.all`确保传输完毕

## 后端

1. 接收切片

   1. 使用`multiparty`中间件解析`FormData`对象，得到文件相关信息

      ```js
      const multipart = new multiparty.Form()
      multipart.parse(req, async (err, fields, files) => {
        const [file] = files.file
        const [fileName] = fields.fileName
        const [chunkName] = fields.chunkName
      })
      ```

   2. 创建文件夹存放切片文件

      ```js
      const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`)
      // 文件夹不存在，新建该文件夹
      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirs(chunkDir)
      } else if (fse.existsSync(`${chunkDir}/${chunkName}`)) {
        // 切片文件存在时，不做处理
        return res.send(JSON.stringify({
          code: 0,
          message: '切片上传成功'
        }))
      }
      
      // 把切片移动进 chunkDir
      await fse.move(file.path, `${chunkDir}/${chunkName}`)
      ```

2. 合并切片

   1. 将切片转换成流

      ```js
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
      ```

   2. 合并切片

      ```js
      /**
       * 合并切片
       * @param filePath 文件路径
       * @param fileName 文件名
       * @param size 文件大小
       */
      async function mergeFileChunk(filePath, fileName, size) {
        const chunkDir = path.resolve(UPLOAD_DIR, `${fileName}-chunks`)
      
        // 读取切片目录内容
        let chunkPaths = await fse.readdir(chunkDir)
        chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1])
      
        const arr = chunkPaths.map((chunkPath, index) => {
          return pipeStream(
            path.resolve(chunkDir, chunkPath),
            // 在指定的位置创建可写流
            fse.createWriteStream(filePath, {
              start: index * size,
              end: (index + 1) * size
            })
          )
        })
        // 保证所有的切片都被读取
        await Promise.all(arr)
      }
      ```
