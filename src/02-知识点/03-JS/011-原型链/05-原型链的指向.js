/**
 * 如下代码示例中，原型链的指向是：
 * p.__proto__ // Person.prototype
 * Person.prototype.__proto__ // Object.prototype
 * p.__proto__.__proto__ //Object.prototype
 * p.__proto__.constructor.prototype.__proto__ // Object.prototype
 * Person.prototype.constructor.prototype.__proto__ // Object.prototype
 * p.__proto__.constructor // Person
 * Person.prototype.constructor // Person
 */

// 构造函数
function Person(name) {
  this.name = name
}

// 实例对象
const p = new Person('hello')
