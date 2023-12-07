/**
 * 知识点补充：
 * ajax、fetch、axios 的区别？
 * 1. ajax 是一项技术的统称，实现页面局部刷新
 * 2. fetch 是一个浏览器的原生 api，与 XMLHttpRequest 是同一个级别，可以看做是 XMLHttpRequest 的改良版
 * 3. axios 是一个基于 promise 的网络请求库，是对 xhr 的二次封装
 */

/**
 * XMLHttpRequest 版
 *
 * get 方式 ajax，传参通过拼接在 url 后
 * post 方式 ajax，传参通过传入 send()
 */
const ajax1 = {
  get(url) {
    // 1. 创建 XMLHttpRequest 对象
    const xhr = new XMLHttpRequest()
    // 2. 创建 http 请求
    xhr.open('GET', url, true) // 第三个参数代表该请求是否为异步
    // 3. 设置监听函数
    xhr.onreadystatechange = () => {
      // 4. 处理请求成功与失败的情况
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('成功：', xhr.responseText)
        return xhr.responseText
      } else {
        console.log('失败：', xhr.status)
        throw new Error(xhr.status)
      }
    }
    // 5. 设置请求失败监听函数
    xhr.onerror = () => {
      console.log('失败：', xhr.status)
      throw new Error(xhr.status)
    }
    // 6. 发起请求
    xhr.send()
  },
  post(url, params) {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    // 设置请求头
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('成功：', xhr.responseText)
        return xhr.responseText
      } else {
        console.log('失败：', xhr.status)
        throw new Error(xhr.status)
      }
    }
    xhr.onerror = () => {
      console.log('失败：', xhr.status)
      throw new Error(xhr.status)
    }
    xhr.send(JSON.stringify(params))
  }
}

/**
 * fetch 版
 *
 * fetch 语法更简洁，且支持 promise
 */
const ajax2 = (url, method, params) => {
  let option = {
    method: method
  }
  if (method === 'POST') {
    option.body = JSON.stringify(params)
    option.headers = {
      'Content-Type': 'application/json'
    }
  }
  fetch(url, option)
    .then(res => {
      console.log('成功：', res.json())
      return res.json()
    })
    .catch(error => {
      throw new Error(error)
    })
}
