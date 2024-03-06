console.log('a')

setTimeout(() => {
  console.log('setTimeout1')
}, 0)

Promise.resolve().then(() => {
  console.log('Promise')
})

setTimeout(() => {
  console.log('setTimeout2')
}, 0)

console.log('b')
