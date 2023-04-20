import MyPromise from './04-手写 Promise'

// 普通状态
/* new MyPromise((resolve, reject) => {
  resolve('成功')
}).then(value => {
  console.log('value', value)
}, error => {
  console.log('error', error)
})
new MyPromise((resolve, reject) => {
  reject('失败')
}).then(value => {
  console.log('value', value)
}, error => {
  console.log('error', error)
}) */

// 抛出异常
/* new MyPromise((resolve, reject) => {
  throw ('抛出异常')
}).then(value => {
  console.log('value', value)
}, error => {
  console.log('error', error)
}) */

// 单个.then() 时的异步
/* new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功')
  }, 2000)
}).then(value => {
  console.log('value', value)
}, error => {
  console.log('error', error)
}) */

// 多个.then() 时的异步
/* const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
  // resolve('success')
})
promise.then(value => {
  console.log('1-resolve', value)
}, error => {
  console.log('1-error', error)
})
promise.then(value => {
  console.log('2-resolve', value)
}, error => {
  console.log('2-error', error)
}) */

// 传入的参数不是函数
/* new MyPromise((resolve, reject) => {
  resolve('success')
}).then(undefined, undefined) */

// 异步执行顺序
/* console.log(1)
const promise = new MyPromise((resolve, reject) => {
  console.log(2)
  setTimeout(() => {
    resolve('这次一定')
    console.log(4)
  })
})
promise.then(
  result => {
    console.log('fulfilled:', result)
  },
  reason => {
    console.log('rejected:', reason)
  }
)
console.log(3) */

// 返回当前 promise
/* const promise = new MyPromise((resolve, reject) => {
  resolve(100)
})
const p1 = promise.then(value => {
  console.log(value)
  return p1
}) */

// 链式调用
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
  // resolve('success')
}).then(value => {
  console.log('1-resolve', value)
}, error => {
  console.log('1-error', error)
}).then(value => {
  console.log('2-resolve', value)
}, error => {
  console.log('2-error', error)
})