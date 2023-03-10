/**
 * 题目：两个栈实现一个队列
 * 
 * 思路：1. 准备两个栈，将元素压入 A 栈。如：1, 2, 3, 4，5 此时 1 为栈顶，5 为栈底
 *       2. 入队：直接继续将元素压入 A 栈。如：1, 2, 3, 4, 5, 6
 *       3. 出队：
 *          3-1：将 A 栈内的元素依次出栈并压入 B 栈。B 栈内的元素为 6, 5, 4, 3, 2, 1 此时 6 为栈顶，1 为栈底
 *          3-2：对元素 1 进行出栈，即出队列
 *          3-3：将 B 栈内的元素依次出栈至 A 栈。A 栈内的元素为 2, 3, 4，5, 6 此时 2 为栈顶，6 为栈底，回归初始时 A 栈排列顺序
 */

export class Queue {
  private stack1: number[] = []
  private stack2: number[] = []

  // 入队
  enqueue(n: number) {
    this.stack1.push(n)
  }

  // 出队
  dequeue(): number | null {
    let res
    // 将 stack1 中元素转移到 stack2 中，注意顺序
    while (this.stack1.length) {
      const n = this.stack1.pop()
      if (n != null) {
        this.stack2.push(n)
      }
    }

    // 对 stack2 进行出栈
    res = this.stack2.pop()

    // 将 stack2 中元素重新转移到 stack1 中
    while (this.stack2.length) {
      const n = this.stack2.pop()
      if (n != null) {
        this.stack1.push(n)
      }
    }

    return res || null
  }

  // 查看队列长度
  get length(): number {
    return this.stack1.length
  }
}

// 功能测试
/* const q = new Queue()
q.enqueue(100)
q.enqueue(200)
q.enqueue(300)
console.log('队列长度为', q.length)
console.log('出队元素为', q.dequeue())
console.log('出队后队列长度为', q.length) */

/**
 * 时间复杂度：
 * enqueue：O(1)
 * dequeue：O(n)。虽然循环了两次，但并未嵌套，即 2*n，由于 n 是一个数量级，2*n 也可看做 n
 */
