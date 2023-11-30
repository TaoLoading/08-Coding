/**
 * 优化版：当未达到最大并发数时，立即补充新的请求，无需等待当前队列所有的请求都执行完成
 * @param {*} urls 请求地址
 * @param {*} maxConcurrent 最大并发请求数
 * @returns
 */
function concurrentRequests(urls, maxConcurrent) {
  if (!maxConcurrent || maxConcurrent <= 0) {
    throw new Error('最大并发数必须是正整数')
  }

  // 发送请求
  async function sendRequest(url, reqPromise) {
    try {
      const res = await fetch(url)
      const data = await res.json()
      return data
    } catch (error) {
      console.error('请求失败:', error)
      throw error
    }
  }

  // 执行全部请求
  async function processQueue() {
    let promises = []
    let results = []

    for (const url of urls) {
      if (promises.length >= maxConcurrent) {
        console.log('达到最大并发数')
        // 等待其中一个请求完成
        const data = await Promise.race(promises)
        // 移除已完成的请求
        promises = promises.filter(p => p !== data)
        // 处理结果
        results.push(data)
        console.log('最大并发数已解决')
      }

      const promise = sendRequest(url)
      console.log('发送请求')
      promises.push(promise)
    }

    // 等待剩余的所有请求完成
    results = results.concat(await Promise.all(promises))

    return results
  }

  return processQueue()
}

// 请求地址
const urlsToFetch = [
  'http://localhost:3000/api/v1/user',
  'http://localhost:3000/api/v1/user',
  'http://localhost:3000/api/v1/user',
  'http://localhost:3000/api/v1/user',
  'http://localhost:3000/api/v1/user',
  'http://localhost:3000/api/v1/user',
  'http://localhost:3000/api/v1/user',
  'http://localhost:3000/api/v1/user'
]

// 最大并发请求数
const maxConcurrentRequests = 2

concurrentRequests(urlsToFetch, maxConcurrentRequests)
  .then(() => {
    console.log('所有请求已完成')
  })
  .catch(error => {
    console.error('请求出错：', error)
  })
