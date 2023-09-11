function currying(fn) {
  const argsLength = fn.length
  const curried = (...args) => {
    if (argsLength > args.length) {
      return (...rest) => curried(...args, ...rest)
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
