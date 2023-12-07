/**
 * 函数柯里化：
 * 把接受多个参数的函数变换成接受一个单一参数的函数，并且返回接受余下的参数且返回结果的新函数
 * 如：function(arg1, arg2, …, argN)  =>  function(arg1)(arg2)…(argN)
 *
 * 思路：
 * 1. 获取原函数形参的个数
 * 2. 返回一个新函数
 * 3. 比较原函数形参和传入参数的个数
 * 4. 当传入参数的个数小于规定的形参个数时，通过递归将参数合并后返回该函数
 * 5. 传入参数完整时返回函数执行的结果
 */

function currying(fn) {
  // 获取形参的个数
  const argsLength = fn.length
  const curried = (...args) => {
    if (args.length < argsLength) {
      // 当传入参数的个数小于规定的形参个数时，通过递归将参数合并后再调用函数
      return (...rest) => curried(...args, ...rest) // rest 是剩余参数
    }
    return fn(...args)
  }
  return curried
}

function add(a, b, c) {
  return a + b + c
}
const curriedAdd = currying(add)
console.log(curriedAdd(1, 2, 3))
console.log(curriedAdd(1)(2, 3))
console.log(curriedAdd(1)(2)(3))
