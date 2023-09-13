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


const a = {}
const b = {
  a: 1
}
console.log('---', Object.keys(a).length)
console.log('---', Object.keys(b).length)
console.log('---', JSON.stringify(a))
console.log('---', JSON.stringify(b))
