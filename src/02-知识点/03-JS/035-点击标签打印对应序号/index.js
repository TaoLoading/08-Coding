/**
 * 错误示范
 * 原因：在点击前 for 循环已经完毕，故每次都是 10
 */
/* let i, a
for (i = 0; i < 10; i++) {
  a = document.createElement('a')
  a.innerHTML = i + '<br>'
  a.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(i)
  })
  document.body.appendChild(a)
} */

/**
 * 方法 1：使用作用域
 * 原理：修改 i 的定义位置，使其位于块级作用域，每次 for 循环都形成新的块，不产生数据污染
 */
/* let a
for (let i = 0; i < 10; i++) {
  a = document.createElement('a')
  a.innerHTML = i + '<br>'
  a.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(i)
  })
  document.body.appendChild(a)
} */

/**
 * 方法 2：使用闭包
 * 原理：定义立即执行函数时将 i 传入函数内部，此时 i 的值就被固定在了 j 上面不会改变（通过闭包延长了外部变量的生命周期），
 *       此时执行函数打印的是外部的变量对象
 */
let i, a
for (i = 0; i < 10; i++) {
  (
    function (j) {
      a = document.createElement('a')
      a.innerHTML = j + '<br>'
      a.addEventListener('click', (e) => {
        e.preventDefault()
        console.log(j)
      })
      document.body.appendChild(a)
    }
  )(i)
}

