/**
 * 寄生组合继承
 * 
 * 寄生组合继承是组合继承的一种优化形式，旨在解决组合继承中重复调用父类构造函数的问题。
 * 在寄生组合继承中，通过将子类的原型对象设置为父类原型的一个副本，从而避免了重复调用父类构造函数
 */

function Parent() {
  this.name = 'Parent'
}
Parent.prototype.sayHello = function () {
  console.log('Hello, ' + this.name)
}
function Child() {
  // 借用父类构造函数
  Parent.call(this)
  this.name = 'Child'
}

// 设置子类原型为父类原型的副本
Child.prototype = Object.create(Parent.prototype)
// 修复构造函数指向
Child.prototype.constructor = Child

const child = new Child()
child.sayHello()  // Hello, Child
