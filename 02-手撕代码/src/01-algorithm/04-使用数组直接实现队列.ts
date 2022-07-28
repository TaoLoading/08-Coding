/**
 * 使用数组直接实现队列
 */

class Queue {
  private arr: number[] = []

  // 入队
  enqueue(n: number) {
    this.arr.push(n)
  }

  // 出队
  dequeue(): number | undefined {
    return this.arr.shift()
  }

  // 查看队头
  get front(): number {
    return this.arr[0]
  }

  // 查看队列
  get length(): number {
    return this.arr.length
  }
}

// 功能测试
const q = new Queue()
q.enqueue(100)
q.enqueue(200)
q.enqueue(300)
console.log('初始队头是', q.front)
console.log('初始队长是', q.length)
q.dequeue()
console.log('出队后队头是', q.front)
console.log('出队后队长是', q.length)
