/**
 * 编程思想：队头报完数后将其删除，并放到队尾部，当报到规定好的数时，直接将该元素删除
 */

function Queue() {
  const arr = []
  this.enqueue = function (params) {
    arr.push(params)
  }
  this.dequeue = function () {
    return arr.shift()
  }
  this.front = function () {
    return arr[0]
  }
  this.size = function () {
    return arr.length
  }
  this.isEmpty = function () {
    return arr.length === 0
  }
}

function passGame(names, number) {
  const queue = new Queue()
  // 将所有元素依次放到队列中
  names.forEach((name, index) => {
    queue.enqueue({ name, index })
  })
  // 只要队列元素个数不为1，进行出入队列循环
  while (queue.size() > 1) {
    // 将前number-1个元素依次放到队列尾部
    for (let i = 0; i < number - 1; i++) {
      queue.enqueue(queue.dequeue())
    }
    // 移出第number个元素即头部元素
    queue.dequeue()
  }
  // 队列中只剩一个元素，结束游戏
  const { name, index } = queue.front()
  console.log(`${name}获得胜利, 它是第${index + 1}个元素`)
}

var names = ['A', 'B', 'C']
passGame(names, 3)