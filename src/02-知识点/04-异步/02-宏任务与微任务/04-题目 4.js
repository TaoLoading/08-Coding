// 执行顺序：script start, async1 start, async2, promise1, script end, async1 end, promise2, setTimeout
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(() => {
  console.log('setTimeout')
}, 0)

async1()

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')

/**
 * async2() 步骤中：
 * 注意，async() 相当于返回一个 promise，相当于 promise.then()，
 * 即将 async 后的程序放到微队列中，而不是将 async 本身的程序放到微队列中，
 * 故 async2 输出早
 */
