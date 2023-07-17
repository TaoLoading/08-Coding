/**
 * JavaScript 没有队列的概念，但可以使用 Array 实现队列的功能
 */

function Queue() {
  const arr = []
  // 入队列：enqueue()
  this.enqueue = function (params) {
    arr.push(params)
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
const queue = new Queue()
queue.enqueue('a')
queue.enqueue('b')
queue.enqueue('c')
queue.dequeue()
console.log(queue.size())
console.log(queue.front())
console.log(queue.isEmpty())
