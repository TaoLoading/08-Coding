/**
 * 限制并发量的批量请求函数
 * 思路：发送请求后将返回的 promise 放到数组，
 *       数组长度超过限制并发数时等到数组中的 promise 完毕后再执行新请求
 * @param {*} urls 请求地址
 * @param {*} maxConcurrent 最大并发请求数
 * @returns
 */
function concurrentRequests(urls, maxConcurrent) {
  let promiseArr = []

  // 发送请求
  async function sendRequest(url) {
    const res = await fetch(url)
    const data = await res.json()
    return data
  }

  // 执行全部请求
  async function processQueue() {
    for (let i = 0; i < urls.length; i++) {
      const currentUrl = urls[i]
      // 发送请求得到一个 promise
      const reqPromise = sendRequest(currentUrl)
      promiseArr.push(reqPromise)

      if (promiseArr.length >= maxConcurrent) {
        console.log('达到最大并发数')
        // 达到最大并发数时，等待全部 promise 执行完毕
        await Promise.race(promiseArr)
        promiseArr = []
        console.log('当前并发执行完毕')
      }
    }

    // 等待所有请求完成
    await Promise.all(promiseArr)
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
