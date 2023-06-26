/**
 * .catch() 返回的状态：
 * 1. 当 catch 内部不进行错误处理时，此时新 promise 的状态依然是 fulfilled
 * 2. 当 catch 内部进行错误处理时，此时新 promise 的状态依然是 rejected
 */

const p1 = Promise.reject('err').catch(err => {
  console.log('err', err)
})
console.log('p1', p1)

const p2 = Promise.reject('err').catch(err => {
  // throw err
  reject(err)
})
console.log('p2', p2)

// 示例
// 打印输出：1,2,3
Promise.resolve(1).then(() => {
  console.log('1')
  throw new Error('myErr')
}).catch(() => {
  console.log('2')
}).catch(() => {
  console.log('3')
})