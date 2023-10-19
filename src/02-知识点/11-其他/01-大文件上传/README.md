# 大文件上传

## 分片上传

### 概念

分片上传是将大文件分割成多个小块，然后逐个上传这些小块。小块可以并行上传，从而提高上传速度。一旦所有分片上传完成，服务器可以将这些分片合并成完整的文件

### 实现

#### 前端

1. 对文件使用`Blob.slice()`实现切片为小文件

   ```js
   /**
    * 文件切片
    * @param file 文件
    * @param size 切片的大小。此处默认 2MB
    * @returns 切片数组
    */
   function createChunk(file, size = 2 * 1024 * 1024) {
     // 已经被切片的文件大小
     let curSize = 0
   
     while (curSize < file.size) {
       chunkList.push({
         // 切片
         // 此处的 slice() 是 file 继承与 Blob 的方法，实际上使用的是 Blob.slice() 方法
         file: file.slice(curSize, curSize + size)
       })
       curSize += size
     }
     return chunkList
   }
   ```

2. 将每个切片信息转换为包含文件特征信息的对象，并转换为`FormData`对象用于发送请求

   ```js
   /**
    * 整理文件。将每个切片信息转换为包含文件特征信息的对象，并转换为 FormData 对象用于发送请求
    * @param chunkList 切片数组
    * @returns 包含文件特征信息切片数组
    */
   async function initChunkList(chunkList) {
     const chunkDataList = []
   
     for (let i = 0; i < chunkList.length; i++) {
       const { file } = chunkList[i]
       // 计算 hash
       const hash = await getHash(file)
       chunkHashList.push(hash)
       chunkSizeList.push(file.size)
   
       chunkDataList.push({
         file,
         size: file.size,
         percent: 0,
         chunkName: `${files.name}-${i}`,
         fileName: files.name,
         index: i,
         hash
       })
     }
   
     const requestList = chunkDataList.map(({ file, fileName, index, chunkName, hash }) => {
       const formData = new FormData()
       formData.append('file', file)
       formData.append('fileName', fileName)
       formData.append('chunkName', chunkName)
       formData.append('hash', hash)
       return { formData, index }
     })
   
     if (chunkDataList.length === chunkList.length) {
       document.getElementById('uploadResult').innerHTML = '解析完成，可以上传'
     }
   
     return requestList
   }
   ```

3. 依次将每个小文件发送到后端，使用`Promise.all`确保传输完毕。全部完毕后向后端发起合并请求

   ```js
   /**
    * 上传文件
    * @param chunkList 包含文件特征信息切片数组
    */
   async function uploadFile(chunkList) {
     // 标识，用于标记切片文件是否全部上传成功
     let flag = false
     const uploadRes = chunkList.map(({ formData, index }) => sendRequest({
       method: 'post',
       url: 'http://localhost:3000/upload',
       data: formData
     })
       .then(res => {
         // 显示每个切片上传结果
         let p = document.createElement('p')
         p.innerHTML = `${chunkList[index].formData.get('chunkName')}--${res.data.message}`
         document.getElementById('uploadResult').appendChild(p)
       })
     )
   
     // 保证所有的切片都已经传输完毕
     flag = await Promise.all(uploadRes)
     if (flag) {
       merge()
     }
   }
   ```

#### 后端

1. 接收切片

   1. 使用`multiparty`中间件解析`FormData`对象，得到文件相关信息

      ```js
      const multipart = new multiparty.Form()
      multipart.parse(req, async (err, fields, files, hash) => {
        const [file] = files.file
        const [fileName] = fields.fileName
        const [chunkName] = fields.chunkName
        const [hash] = fields.hash
      })
      ```

   2. 创建文件夹存放切片文件

      ```js
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
      ```

## 秒传

### 概念

秒传实际上就是不传，允许用户在上传文件时，如果服务器已经存在完全相同的文件，就直接跳过上传过程，实现瞬间完成的效果

### 实现

在服务端判断所上传文件的`hash`是否存在，存在则不进行二次上传操作

## 断点续传

## 概念

断点续传是一种允许在上传中断后继续上传，而无需从头开始
