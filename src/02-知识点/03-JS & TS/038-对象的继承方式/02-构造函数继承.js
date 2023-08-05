/**
 * 构造函数继承
 * 
 * 使用 call/apply，在子类构造函数中将父类的属性和方法添加到子类实例
 * 
 * 优先：解决了类型属性的共享问题
 * 缺点：每创建一个实例都会调用一次父类构造函数，无法继承父类原型上的属性和方法
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

var child = new Child()
child.sayHello() // Hello, Child

