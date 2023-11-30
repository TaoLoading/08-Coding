/**
 * 限制并发量的批量请求函数
 * 思路：发送请求后将返回的 promise 放到数组，
 *       数组长度超过限制并发数时等到数组中的 promise 完毕后再执行新请求
 * @param {*} urls 请求地址
 * @param {*} maxConcurrent 最大并发请求数
 * @returns
 */
function concurrentRequests(urls, maxConcurrent) {
  if (!maxConcurrent) {
    throw '最大限制数为 0'
  }

  // 发送请求
  async function sendRequest(url) {
    const res = await fetch(url)
    const data = await res.json()
    return data
  }

  // 执行全部请求
  async function processQueue() {
    let promiseArr = []

    console.log('执行全部请求')
    for (let i = 0; i < urls.length; i++) {
      if (promiseArr.length >= maxConcurrent) {
        console.log('达到最大并发数')
        // 达到最大并发数时，等待全部 promise 执行完毕
        await Promise.all(promiseArr)
        promiseArr = []
        console.log('当前并发执行完毕')
      } else {
        console.log('发送请求')
        const currentUrl = urls[i]
        // 发送请求得到一个 promise
        const reqPromise = sendRequest(currentUrl)
        promiseArr.push(reqPromise)
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
