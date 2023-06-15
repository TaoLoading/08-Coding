/**
 * 函数柯里化：
 * 把接受多个参数的函数变换成接受一个单一参数 (最初函数的第一个参数) 的函数，并且返回接受余下的参数且返回结果的新函数
 */

function add(a, b, c) {
  return a + b + c
}

function currying(func) {
  // 形参的个数
  let argsLength = func.length
  let curried = (...args) => {
    if (args.length < argsLength) {
      // 当传入参数的个数小于规定的形参个数时，通过递归将参数合并后再调用函数
      return (...rest) => curried(...args, ...rest)
    }
    return func(...args)
  }
  return curried
}

let curriedAdd = currying(add)
console.log(curriedAdd(1, 2, 3))
console.log(curriedAdd(1)(2, 3))
console.log(curriedAdd(1)(2)(3))
