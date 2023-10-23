# Web Worker

## 概念

Web Worker 是 HTML5 提供的一种在后台线程中运行脚本的方法，它允许开发者编写能够长时间运行而不被用户界面阻塞的程序。这对于需要进行复杂计算或需要在后台处理大量数据的 Web 应用程序是非常有用的

## 作用

1. 进行大量计算。把复杂的运算任务放到后台线程去做，使得主线程能够快速响应用户交互，保持界面的流畅性
2. 处理大量数据。在后台线程上处理大量操作，避免阻塞用户界面

## 用法

1. 创建 worker 对象

   ```js
   const worker = new Worker(path) // js 脚本的地址，必须遵守同源策略
   ```

2. 主线程中与 worker 线程交互（发送、接收数据，错误监听）

   ```js
   if (typeof (worker) == 'undefined') {
     worker = new Worker('worker.js')
   
     // 接收 worker 线程发送回来的数据
     worker.onmessage = function (e) {
       document.getElementById('result').innerText = '接收到的数据：' + e.data
     }
   
     // 监听 worker 线程错误事件
     worker.onerror = function (error) {
       console.error('发生错误：' + error.message)
     }
   }
   
   // 发送数据到 worker 线程
   worker.postMessage(1000000000)
   ```

3. worker 线程中操作数据

   ```js
   // 监听 message 事件以接收主线程发送过来的数据
   self.addEventListener('message', function (e) {
     const num = e.data
   
     let result = 0
     for (var i = 0; i <= num; i++) {
       result += i
     }
   
     // 将结果发送回主线程
     self.postMessage(result)
   }, false)
   ```

4. 操作完毕后关闭 worker

   * 主线程中关闭 worker 后，worker 线程中继续调用`postMessage()`主线程也不会再收到消息
   * worker 线程中关闭 worker 后，worker 线程中继续调用`postMessage()`主线程会再收到消息

   ```js
   // 主线程中关闭
   worker.terminate()
   worker = undefined
   
   // worker 线程中关闭
   self.close()
   ```

## 其他使用点

1. 使用`importScripts()`实现 worker 线程中使用其他 js 脚本。此方式**不受同源策略约束**

   ```js
   importScripts('./utils.js')
   ```

2. 指定 worker.js 的模块化类型

   ```js
   const worker = new Worker('worker.js', {
       type: 'module'  // 指定 worker.js 为 ESModule 模式
   })
   ```

3. SharedWorker

   SharedWorker 是 Web Worker 的一种类型，它允许多个浏览器上下文（例如多个窗口、标签页或框架）共享同一个后台线程
