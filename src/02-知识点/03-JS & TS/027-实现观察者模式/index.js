// 事物类
class Subject {
  constructor() {
    this.observers = []
  }

  // 创建观察者
  addObserver(observer) {
    this.observers.push(observer)
  }

  // 删除观察者
  deleteObserver(name) {
    this.observers = this.observers.filter(obs => {
      return obs.name !== name
    })
  }

  // 通知观察者
  notifyObservers(data) {
    this.observers.forEach(observer => observer.update(data))
  }
}

// 观察者类
class Observer {
  constructor(name) {
    this.name = name
  }

  // 观察者更新
  update(data) {
    console.log(`${this.name} 收到通知，数据为：${data}`)
  }
}

/**
 * 测试
 */
const subject = new Subject()
const observer1 = new Observer('Observer 1')
const observer2 = new Observer('Observer 2')

// 订阅观察者
subject.addObserver(observer1)
subject.addObserver(observer2)

// 通知观察者
console.log('测试创建与通知观察者 start')
subject.notifyObservers('Hello observers!')
console.log('测试创建与通知观察者 end')

// 删除观察者
console.log('测试删除观察者 start')
subject.deleteObserver('Observer 1')
subject.notifyObservers('Hello observers!')
console.log('测试删除观察者 end')
