/**
 * instanceof：
 * 1. 表达式：obj/arr instanceof constructor
 * 2. 原理：判断引用数据类型（obj/arr）是否是构造函数 constructor 的实例，是返回 true, 否则返回 false
 */

function myInstanceof(obj, constructor) {
  // 获取 obj 的隐式原型对象
  let proto = obj.__proto__ // 也可使用 Object.getPrototypeOf(obj) 获取 obj 的隐式原型对象
  while (proto) {
    // 对比 obj 的隐式原型对象和 constructor 的显式原型对象
    if (proto === constructor.prototype) {
      return true
    }
    // 沿原型链向上一层
    proto = proto.__proto__
  }
  return false
}

// 测试
function Foo() { }
function Foo2() { }
const obj = new Foo()
console.log(myInstanceof(obj, Foo)) // true
console.log(myInstanceof(obj, Foo2)) // false
console.log(myInstanceof(obj, Object)) // true

console.log('2 instanceof Number', 2 instanceof Number) // false。因为 instanceof 只能对引用数据类型做判断
