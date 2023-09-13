/**
 * 自定义事件
 * 1. 创建事件对象：使用 Event 或 CustomEvent 创建一个新的事件对象
 *        区别在于 CustomEvent 创建的事件对象可以携带自定义数据（在 detail 内）
 * 2. 注册事件监听器：addEventListener
 * 3. 触发事件：document.dispatchEvent()
 */

const myEvent = new Event('myEvent')
const myCustomEvent = new CustomEvent('myCustomEvent', {
  detail: { message: 'Hello World!' }
})

document.addEventListener('myEvent', () => {
  console.log('myEvent 事件触发')
})

document.addEventListener('myCustomEvent', (e) => {
  const { detail } = e
  console.log('myCustomEvent 事件触发', detail)
})

document.dispatchEvent(myEvent)
document.dispatchEvent(myCustomEvent)
