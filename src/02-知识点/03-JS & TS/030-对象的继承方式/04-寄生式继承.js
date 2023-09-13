/**
 * 寄生式继承
 * 
 * 创建一个仅用于封装继承过程的函数，通过在该函数内部基于某个对象为原型创建一个新对象并对其进行扩展，
 * 返回这个新对象，新对象就可以继承原始对象的属性和方法
 * 
 * 优先：不破坏原型链
 * 缺点：无法继承父类原型上的属性和方法
 */

function createChild(parent) {
  // 创建新对象，以 parent 为原型对象
  let child = Object.create(parent)
  // 添加子类特有属性
  child.name = 'Child'
  // 添加子类特有方法
  child.sayHello = function () {
    console.log('Hello, ' + this.name)
  }
  return child
}
const parent = {
  name: 'Parent',
  sayHello: function () {
    console.log('Hello, ' + this.name)
  }
}

const child = createChild(parent)
child.sayHello()  // Hello, Child
