/**
 * Promise 错误穿透
 * 1. 当使用 promise 的 .then 链式调用时，可以在最后指定失败的回调
 * 2. 在.then 链式调用中间没有指定 .reject()，最终也会传到最后失败的回调中处理
 * 3. 虽然没有指定.reject()，promise 在执行时默认进行了错误处理，达到错误穿透的效果
 * 
 * 中断 Promise 链
 * 通过返回一个 pending 状态的 promise 中断 promise 链
 */

// 错误穿透
/* new Promise((resolve, reject) => {
  reject(2)
}).then(
  value => console.log('1-1 成功', value)
).then(
  value => console.log('1-2 成功', value)
).then(
  value => console.log('1-3 成功', value)
).catch(err => {
  console.log('1-1 失败', err)
}) */

// 中断 Promise 链
new Promise((resolve, reject) => {
  reject(2)
}).then(
  value => console.log('2-1 成功', value)
).then(
  value => console.log('2-2 成功', value)
).catch(err => {
  console.log('2-1 失败', err)
  // 此处若不进行处理，则 promise 依旧会继续向下执行到“2-3 成功”，因为.catch() 没有指定 promise 的状态
  // throw err

  // 通过返回一个 pending 状态的 promise 中断 promise 链接  
  return new Promise(() => { })
}).then(
  value => console.log('2-3 成功', value),
  err => console.log('2-2 失败', err)
)