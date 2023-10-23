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

// worker 线程中关闭 worker
// self.close()
