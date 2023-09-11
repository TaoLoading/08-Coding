/**
 * 原型链继承
 * 
 * 通过修改原型链继承父构造函数的属性和方法
 * 
 * 缺点：类型属性的共享问题，即每个实例对象都被修改
 */

function Parent() {
  this.name = 'Parent'
}
Parent.prototype.sayHello = function () {
  console.log('Hello, ' + this.name)
}
function Child() {
  this.name = 'Child'
}

// 通过原型链连接
Child.prototype = new Parent()

var child = new Child()
child.sayHello()  // Hello, Child
