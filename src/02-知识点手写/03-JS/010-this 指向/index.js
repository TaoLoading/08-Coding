const example1 = {
  fn1() {
    console.log(this) // 当前对象
  },
  fn2() {
    setTimeout(function () {
      console.log(this) // window
    }, 100)
  },
  fn3() {
    setTimeout(() => {
      console.log(this) // 当前对象
    }, 100)
  }
}
example1.fn1()
example1.fn2() // 虽然调用了 fn2()，但是最终的 setTimeout() 是由 window 调用的
example1.fn3() // 箭头函数的 this 指向外层对象
