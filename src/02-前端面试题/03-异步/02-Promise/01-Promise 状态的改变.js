/**
 * 如何改变 promise 的状态？
 * 1. 使用 resolve(value): 如果当前是 pending 就会变为 fulfilled
 * 2. 使用 reject(err): 如果当前是 pending 就会变为 rejected
 * 3. 抛出异常：如果当前是 pending 就会变为 rejected
 */

const p = new Promise((resolve, reject) => {
  // 1. pending ==> fulfilled
  resolve(1)

  // 2. pending ==> rejected
  // reject(2)

  // 3. pending ==> rejected
  // throw 3

  // 4. 自己捕获错误，promise 状态不改变，应该 promise 自身可以捕获错误
  /* try {
    throw 3
  } catch (err) {
    console.log('err', err)
  } */
})
p.then((value) => {
  console.log('onResolved()', value)
}, (err) => {
  console.log('onRejected()', err)
})