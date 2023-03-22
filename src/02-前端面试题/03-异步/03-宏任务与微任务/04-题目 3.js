// 执行顺序：1,7,2,3,8,4,6,5,0
setTimeout(() => {
  console.log('0')
}, 0)
new Promise((resolve, reject) => {
  console.log('1')
  resolve()
}).then(() => {
  console.log('2')
  new Promise((resolve, reject) => {
    console.log('3')
    resolve()
  }).then(() => {
    console.log('4')
  }).then(() => {
    console.log('5')
  })
}).then(() => {
  console.log('6')
})

new Promise((resolve, reject) => {
  console.log('7')
  resolve()
}).then(() => {
  console.log('8')
})