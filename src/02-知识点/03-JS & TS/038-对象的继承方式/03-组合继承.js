/**
 * 组合继承
 * 
 * 将原型链继承和构造函数继承结合。将子类的原型对象指向父类的实例，实现对父类原型上属性和方法的继承，
 * 同时使用构造函数继承来继承父类的实例属性和方法
 * 
 * 缺点：每创建一个实例都会调用 2 次父类构造函数，
 */

function Parent() {
  this.name = 'Parent'
}
Parent.prototype.sayHello = function () {
  console.log('Hello, ' + this.name)
}
function Child() {
  // 使用构造函数继承
  Parent.call(this)
  this.name = 'Child'
}

// 使用原型链函数继承
Child.prototype = new Parent()
// 修复构造函数指向。不修复则 Child.prototype.constructor 指向 Parent
Child.prototype.constructor = Child

const child = new Child()
child.sayHello()  // Hello, Child
