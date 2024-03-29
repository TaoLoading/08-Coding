// 1. 对象字面量
const obj1 = {
  property1: 'value1',
  property2: 'value2',
  method1: function () {}
}

// 2. 工厂函数
function createPerson(name, age) {
  const p = {
    name: name,
    age: age,
    setName: function (name) {
      this.name = name
    }
  }
  return p
}
const person1 = createPerson('Tom', 12)
const person2 = createPerson('JAck', 13)

// 3. 构造函数
function Person(name, age) {
  this.name = name
  this.age = age
  this.sayHello = function () {}
}
const person3 = new Person('John', 25)

// 4. Class 类
class PersonClass {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  sayHello() {}
}
const person4 = new Person('John', 25)

// 5. Object.create()：使用 Object.create() 方法可根据源对象创建一个新对象，并将源对象设置为新对象的原型对象
const prototypeObj = {
  property1: 'value1',
  property2: 'value2',
  method1: function () {}
}
const obj2 = Object.create(prototypeObj)
