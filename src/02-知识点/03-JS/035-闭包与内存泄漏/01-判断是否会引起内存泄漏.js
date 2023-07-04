/**
 * 代码 1
 * 存在内存泄漏
 * 原因：name 的声明没有使用 var/let/const，导致 name 变成了全局变量
 */
function getName() {
  name = 'javascript'
}
getName()


/**
 * 代码 2
 * 存在内存泄漏
 * 原因：button 被引用，导致虽然 removeChild 但不会被 GC 回收，会造成内存泄漏
 */
const elements = {
  button: document.getElementById('button')
}
function removeButton() {
  document.body.removeChild(elements.button)
}
removeButton()


/**
 * 代码 3
 * 不存在内存泄漏
 */
let timer = setInterval(() => {
  const node = document.querySelector('#node')
  if (node) {
    clearInterval(timer)
  }
}, 1000)
