/**
 * 效果：返回一个新函数，新函数的逻辑是将传入的函数按顺序全部执行
 */

function compose(...fns) {
  // 排除特殊情况
  if (fns.length === 0) {
    return (num) => num
  }
  if (fns.length === 1) {
    return fns[0]
  }

  return fns.reduce((acc, cur) => {
    return (num) => {
      return cur(acc(num))
    }
  })
}


// 测试
function fn1(x) {
  return x + 1
}
function fn2(x) {
  return x + 2
}
function fn3(x) {
  return x + 3
}
const res = compose(fn1, fn2, fn3)(1)
console.log(res) // 1+1+2+3 = 7
