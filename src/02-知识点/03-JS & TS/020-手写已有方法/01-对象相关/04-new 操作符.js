/**
 * new 操作符都做了什么：
 * 1. 创建一个空对象
 * 2. 将该对象和构造函数通过原型链进行连接（将对象的__proto__属性指向构造函数的 prototype 属性）
 * 3. 修改构造函数的 this 指向到该对象
 * 4. 返回新创建的实例对象
 */

function myNew(fn, ...args) {
  const obj = {}
  obj.__proto__ = fn.prototype
  fn.apply(obj, args)
  return obj
}

// 测试
function Foo() { }
const obj = myNew(Foo)
console.log(obj instanceof Foo) // true
console.log(obj instanceof Object) // true
