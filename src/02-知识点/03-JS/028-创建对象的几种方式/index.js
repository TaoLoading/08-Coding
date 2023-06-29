// 1. 对象字面量
const obj1 = {
  property1: 'value1',
  property2: 'value2',
  method1: function () {
  }
}

// 2. 构造函数
function Person(name, age) {
  this.name = name
  this.age = age
  this.sayHello = function () {
  }
}
const person1 = new Person('John', 25)

// 3. Class 类
class PersonClass {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  sayHello() {
  }
}
const person2 = new Person('John', 25)

// 4. Object.create()：使用 Object.create() 方法可以创建一个新对象，并将其原型设置为指定的对象
const prototypeObj = {
  property1: 'value1',
  property2: 'value2',
  method1: function () {
  }
}
const obj2 = Object.create(prototypeObj)
