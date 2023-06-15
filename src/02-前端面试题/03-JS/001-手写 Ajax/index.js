/**
 * 知识点补充：
 * ajax、fetch、axios 的区别？
 * 1. ajax 是一项技术的统称，实现页面局部刷新
 * 2. fetch 是一个浏览器的原生 api，与 XMLHttpRequest 是同一个级别，可以看出是 XMLHttpRequest 的改良版
 * 3. axios 是一个基于 promise 的网络请求库，是对 xhr 的二次封装
 */

/**
 * XMLHttpRequest 版
 * 
 * get 方式 ajax，传参通过拼接在 url 后
 * post 方式 ajax，传参通过传入 send()
 */
const ajax = {
  get(url, fn) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true) // 第三个参数代表该请求是否为异步
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        fn(xhr.responseText)
      }
    }
    xhr.send()
  },
  post(url, data, fn) {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        fn(xhr.responseText)
      }
    }
    xhr.send(data)
  }
}


/**
 * fetch 版
 * 
 * fetch 语法更简洁，且支持 promise
 */
function ajax2(url) {
  return fetch(url).then(res => {
    console.log('请求成功，返回值为', res.json())
  })
}
