/**
 * 优先级队列：入队列时传入两个数，第一个数是元素值，第二个数是优先级值，队列中按照优先级的顺序 (可大可小) 排列元素
 */

// 将传入的元素转换为对象
function elementType(data, priority) {
  this.data = data
  this.priority = priority
}

// 优先级队列，此处规定优先级排列顺序为优先级值越小优先级越高
function priorityQueue() {
  // 存入的数据类型是对象
  const arr = []
  // 入队列：enqueue()
  this.enqueue = function (data, priority) {
    const element = new elementType(data, priority)
    // 插入元素到 arr
    // 当 arr 为空时，直接插入
    if (arr.length === 0) {
      arr.push(element)
    } else {
      // 当 arr 不为空时，将元素插入到第一个优先级值比当前优先级值大的元素的左侧
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].priority > priority) {
          arr.splice(i, 0, element)
          return
        }
      }
      // 结束 for 循环后还未 return 则说明当前元素优先级值最大，放到最烈尾部
      arr.push(element)
    }
  }

  // 出队列：dequeue()
  this.dequeue = function () {
    return arr.shift()
  }
  // 查看队头：front()
  this.front = function () {
    return arr[0]
  }
  // 查看队列中元素个数：size()
  this.size = function () {
    return arr.length
  }
  // 查看是否是空队列：()
  this.isEmpty = function () {
    return arr.length === 0
  }
}

// 测试
const pQueue = new priorityQueue()
pQueue.enqueue("abc", 10)
pQueue.enqueue("cba", 5)
pQueue.enqueue("nba", 12)
pQueue.enqueue("mba", 3)
var size = pQueue.size()
console.log(size)
for (var i = 0; i < size; i++) {
  var item = pQueue.dequeue()
  console.log(item.data, item.priority)
}