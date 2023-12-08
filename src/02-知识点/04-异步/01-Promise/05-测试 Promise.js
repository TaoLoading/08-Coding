import MyPromise from './04-手写 Promise'

/* Promise 核心部分的多种情况测试 start */

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
/* new MyPromise((resolve, reject) => {
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
}) */

/* Promise 核心部分的多种情况测试 end */

// Promise.resolve()
/* let promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hello, world!')
  }, 1000)
})
Promise.resolve(promise).then(result => {
  console.log(result)
}) */

// Promise.all()
/* const promise1 = new MyPromise(resolve => setTimeout(() => resolve('Promise 1 resolved'), 1000))
const promise2 = new MyPromise((_, reject) => setTimeout(() => reject('Promise 2 failed'), 2000))
const promise3 = new MyPromise(resolve => setTimeout(() => resolve('Promise 3 resolved'), 1500))

MyPromise.all([promise1, promise3]).then(
  value => {
    console.log('value', value)
  },
  error => {
    console.log('error', error)
  }
) */

// Promise.race()
// 创建多个 Promise，模拟不同的延迟时间
const promise1 = new Promise(resolve => setTimeout(() => resolve('Promise 1 resolved'), 3000))
const promise2 = new Promise(resolve => setTimeout(() => resolve('Promise 2 resolved'), 2000))
const promise3 = new Promise((_, reject) => setTimeout(() => reject('Promise 3 failed'), 1500))

// 使用 Promise.race() 观察哪个 Promise 最快完成
Promise.race([promise1, promise2, promise3]).then(
  result => {
    console.log('value', result)
  },
  error => {
    console.log('error', error)
  }
)
