// 请求地址
const urls = [
  'http://localhost:3000/api/v1/user',
  'http://localhost:3000/api/v1/user',
  'http://localhost:3000/api/v1/user',
  'http://localhost:3000/api/v1/user',
  'http://localhost:3000/api/v1/user',
  'http://localhost:3000/api/v1/user',
  'http://localhost:3000/api/v1/user',
  'http://localhost:3000/api/v1/user'
]

// 最大并发量
const maxNum = 2

function limitReqFn(urls, maxNum) {
  if (!maxNum) {
    throw '最大数为 0'
  }

  async function requestUtil(url) {
    const res = await fetch(url)
    const data = res.json()
    return data
  }

  async function core() {
    let promiseArr = []
    for (let i = 0; i < urls.length; i++) {
      if (promiseArr.length >= maxNum) {
        console.log('达到最大并发数')
        await Promise.race(promiseArr)
        promiseArr = []
        console.log('当前并发执行完毕')
      } else {
        console.log('发送请求')
        const currentUrl = urls[i]
        const reqPromise = requestUtil(currentUrl)
        promiseArr.push(reqPromise)
      }
    }

    // 等待所有请求完成
    await Promise.all(promiseArr)
  }

  return core()
}

limitReqFn(urls, maxNum)
  .then(() => {
    console.log('所有请求已完成')
  })
  .catch(error => {
    console.error('请求出错：', error)
  })
