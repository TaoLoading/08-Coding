class EventEmitter {
  constructor() {
    this.cache = {}
  }

  // 订阅事件
  on(name, fn) {
    const tasks = this.cache[name]
    if (tasks) {
      // 存在该任务，将新的函数放到数组中
      this.cache[name].push(fn)
    } else {
      // 不存在该任务，新建数组并放入该函数
      this.cache[name] = [fn]
    }
  }

  // 取消订阅事件
  off(name, fn) {
    const tasks = this.cache[name]
    if (tasks) {
      // 存在该任务，将该函数从数组中移除
      const index = tasks.indexOf(fn)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    }
  }

  // 仅订阅一次事件
  once(name, cb) {
    // 创建一个新方法，方法内包括执行一次回调函数以及取消订阅事件
    const fn = (...args) => {
      cb(...args)
      this.off(name, fn)
    }
    // 订阅事件
    this.on(name, fn)
  }

  // 发布事件 (触发事件)
  emit(name, ...args) {
    // 深拷贝一份，防止回调函数中触发 on 导致回调函数数组发生变化
    const tasks = this.cache[name].slice()
    if (tasks) {
      for (let fn of tasks) {
        fn(...args)
      }
    } else {
      console.log('不存在事件')
    }
  }
}

/**
 * 测试
 */
const eventEmitter = new EventEmitter()

// 定义事件
function callback11(arg1, arg2) {
  console.log('event1 callback1:', arg1, arg2)
}
function callback12(arg1, arg2) {
  console.log('event1 callback2:', arg1, arg2)
}
function callback2(arg1, arg2) {
  console.log('event2 callback:', arg1, arg2)
}

// 订阅事件
eventEmitter.on('event1', callback11)
eventEmitter.on('event1', callback12)
eventEmitter.once('event2', callback2)

// 发布事件
console.log('测试订阅与发布事件 start')
eventEmitter.emit('event1', 'hello1', 'world1')
console.log('测试订阅与发布事件 end')

// 取消订阅事件
eventEmitter.off('event1', callback12)

// 再次触发事件
console.log('测试取消订阅事件 start')
eventEmitter.emit('event1', 'hello', 'world')
console.log('测试取消订阅事件 start')

console.log('测试订阅一次事件 start')
eventEmitter.emit('event2', 'hello2', 'world2')
eventEmitter.emit('event2', 'hello2', 'world2')
console.log('测试订阅一次事件 end')
