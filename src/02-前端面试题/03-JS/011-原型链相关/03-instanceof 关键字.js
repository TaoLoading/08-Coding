/**
 * instanceof：
 * 1. 表达式：A instanceof B
 * 2. 原理：判断 A 对象的原型链上是否存在 B 函数的显式原型对象，存在返回 true, 否则返回 false
 */

// 实现 instanceof
function myInstanceof(fn, obj) {
  let fp = fn
  if (fn !== Function) {
    fp = fn.prototype
  }
  let op = obj
  if (obj !== Object) {
    op = obj.__proto__
  }

  while (op) {
    if (fp === op) {
      return true
    } else {
      op = op.__proto__
    }
  }
  return false
}

// 测试
function Foo() { }
var obj = new (Foo)
// console.log(myInstanceof(Foo, obj))
// console.log(myInstanceof(Object, obj))
console.log()