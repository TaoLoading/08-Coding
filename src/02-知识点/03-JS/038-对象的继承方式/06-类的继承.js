/**
 * 类的继承与对象的继承是不同的概念
 */

class Parent {
  constructor(name) {
    this.name = name
  }

  sayHello() {
    console.log('Hello, ' + this.name)
  }
}

class Child extends Parent {
  constructor(name, age) {
    // 调用父类的构造函数
    super(name)

    this.age = age
  }

  sayAge() {
    console.log('My age is ' + this.age)
  }
}

var child = new Child('Child', 10)
child.sayHello() // Hello, Child
child.sayAge() // My age is 10
