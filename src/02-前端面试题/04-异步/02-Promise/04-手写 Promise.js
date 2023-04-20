export default class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      // 针对 throw 的处理
      this.reject(error)
    }
  }

  // 初始化状态
  promiseStatus = 'pending'
  // 初始化结果
  PromiseResult = null
  // 成功的回调函数
  onFulfilledCallbacks = []
  // 失败的回调函数
  onRejectedCallbacks = []

  // 成功
  resolve = (value) => {
    if (this.promiseStatus === 'pending') {
      this.promiseStatus = 'fulfilled'
      this.PromiseResult = value
      this.onFulfilledCallbacks.forEach(callback => callback(value))
    }
  }

  // 失败
  reject = (error) => {
    if (this.promiseStatus === 'pending') {
      this.promiseStatus = 'rejected'
      this.PromiseResult = error
      this.onRejectedCallbacks.forEach(callback => callback(error))
    }
  }

  then(onFulfilled, onRejected) {
    // 校验参数，确保传入的是函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    // 返回一个新的 promise
    const newPromise = new MyPromise((resolve, reject) => {
      if (this.promiseStatus === 'pending') {
        // 等待
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              if (typeof onFulfilled !== 'function') {
                resolve(this.PromiseResult)
              } else {
                let x = onFulfilled(this.PromiseResult)
                resolvePromise(newPromise, x, resolve, reject)
              }
            } catch (error) {
              reject(error)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              if (typeof onRejected !== 'function') {
                reject(this.PromiseResult)
              } else {
                let x = onRejected(this.PromiseResult)
                resolvePromise(newPromise, x, resolve, reject)
              }
            } catch (error) {
              reject(error)
            }
          })
        })
      } else if (this.promiseStatus === 'fulfilled') {
        // 成功
        setTimeout(() => {
          try {
            if (typeof onFulfilled !== 'function') {
              resolve(this.PromiseResult)
            } else {
              let x = onFulfilled(this.PromiseResult)
              resolvePromise(newPromise, x, resolve, reject)
            }
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.promiseStatus === 'rejected') {
        // 失败
        setTimeout(() => {
          try {
            if (typeof onRejected !== 'function') {
              reject(this.PromiseResult)
            } else {
              let x = onRejected(this.PromiseResult)
              resolvePromise(newPromise, x, resolve, reject)
            }
          } catch (error) {
            reject(error)
          }
        })
      }
    })

    return newPromise
  }
}

/**
 * 
 * @param {promise} newPromise 前一个 promise.then 方法返回的新 promise 对象
 * @param {*} x                前一个 promise 中 onFulfilled 或 onRejected 的返回值。类型：普通值/Promise
 * @param {*} resolve          新 promise 对象的 resolve 方法
 * @param {*} reject           新 promise 对象的 reject 方法
 */
function resolvePromise(newPromise, x, resolve, reject) {
  // 不可返回当前 promise 本身
  if (newPromise === x) {
    throw new TypeError('Chaining cycle detected for promise #<Promise>')
  }

  // 如果 x 为 Promise，则使 newPromise 接受 x 的状态
  if (x instanceof MyPromise) {
    x.then(y => {
      resolvePromise(newPromise, y, resolve, reject)
    }, reject)
  } else if (x !== null && ((typeof x === 'object' || (typeof x === 'function')))) {
    // 如果 x 为 对象或函数，x.then 赋值给 then
    try {
      var then = x.then
    } catch (e) {
      return reject(e)
    }

    // 如果 then 是函数，将 x 作为函数的作用域 this 调用
    if (typeof then === 'function') {
      // 标记，用于区别是否已被调用。当.then() 内部的 resolve() 和 reject() 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
      let called = false
      try {
        then.call(
          x,
          y => {
            if (called) return
            called = true
            resolvePromise(newPromise, y, resolve, reject)
          },
          r => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } catch (e) {
        // 如果.then() 内部的 resolve() 或 reject() 已经被调用，则忽略。否则抛出异常
        if (called) return
        called = true

        reject(e)
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x)
    }
  } else {
    //  如果 x 不为对象或者函数，以 x 为参数执行 promise
    return resolve(x)
  }
}