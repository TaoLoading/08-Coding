/**
 * 思路参考：https://juejin.cn/post/6945319439772434469
 */

class MyPromise {
  // 构造方法
  constructor(executor) {
    // 初始化
    this.initValue()
    this.initBind()

    try {
      // 执行传进来的函数
      executor(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
  }

  // 初始化 this
  initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  // 初始化状态与结果
  initValue() {
    this.PromiseState = 'pending'
    this.PromiseResult = null
  }

  // 成功
  resolve(value) {
    if (this.PromiseState !== 'pending') return
    this.PromiseState = 'fulfilled'
    this.PromiseResult = value
  }

  // 失败
  reject(reason) {
    if (this.PromiseState !== 'pending') return
    this.PromiseState = 'rejected'
    this.PromiseResult = reason
  }
}

// 测试
const res1 = new MyPromise((resolve, reject) => {
  resolve('成功')
})
console.log(res1) // 成功

const res2 = new MyPromise((resolve, reject) => {
  reject('失败')
})
console.log(res2) // 失败

const res3 = new MyPromise((resolve, reject) => {
  resolve('成功')
  reject('失败')
})
console.log(res3) // 成功

const res4 = new MyPromise((resolve, reject) => {
  throw ('失败')
})
console.log(res4) // 失败
