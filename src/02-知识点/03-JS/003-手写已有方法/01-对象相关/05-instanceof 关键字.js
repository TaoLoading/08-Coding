/**
 * instanceof：
 * 1. 表达式：obj/arr instanceof constructor
 * 2. 原理：判断对象或数组 obj/arr 是否是构造函数 constructor 的实例，是返回 true, 否则返回 false
 */

function myInstanceof(obj, constructor) {
  // 获取 obj 的隐式原型对象
  let proto = Object.getPrototypeOf(obj)
  while (proto) {
    // 对比 obj 的隐式原型对象和 constructor 的显式原型对象
    if (proto === constructor.prototype) {
      return true
    }
    // 沿原型链向上一层
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

// 测试
function Foo() { }
function Foo2() { }
var obj = new Foo()
console.log(myInstanceof(obj, Foo))
console.log(myInstanceof(obj, Foo2))
console.log(myInstanceof(obj, Object))
