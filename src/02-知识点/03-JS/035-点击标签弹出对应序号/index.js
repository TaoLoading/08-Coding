// 错误示范
/* let i, a
for (i = 0; i < 10; i++) {
  a = document.createElement('a')
  a.innerHTML = i + '<br>'
  a.addEventListener('click', (e) => {
    e.preventDefault()
    alert(i)
  })
  document.body.appendChild(a)
} */

/**
 * 原理：修改 i 的定义位置，使其位于块级作用域，每次 for 循环都形成新的快，不产生数据污染
 */
let a
for (let i = 0; i < 10; i++) {
  a = document.createElement('a')
  a.innerHTML = i + '<br>'
  a.addEventListener('click', (e) => {
    e.preventDefault()
    alert(i)
  })
  document.body.appendChild(a)
}
