/**
 * 题目：使用链表实现队列
 * 
 * 思路：
 * 假设链表为：A → B → C → D，设置两个指针 head 和 tail，head 指向头部的 A，tail 指向尾部的 D，
 * 需要注意，从 tail 入队，从 head 出队。入队时 tail 指向新入队的节点，出队时 head 指向下一个节点，
 * 因为单向链表中只有 next 指向下一个节点，如果从 tail 出队，则无法找到其前一个节点
 * 
 * 在计算长度时不能直接遍历链表去计算，因为时间复杂度高 O(n)，而是要单独存取
 */

interface LinkListNodeType {
  value: number
  next: LinkListNodeType | null
}

export class Queue {
  private head: LinkListNodeType | null = null
  private tail: LinkListNodeType | null = null
  private len: number = 0

  // 入队
  enqueue(n: number) {
    // 规范入队的元素
    const newNode: LinkListNodeType = {
      value: n,
      next: null
    }

    // 处理 head
    // head 为空时说明队列为空，此时 head 和 tail 都指向同一个节点
    if (this.head === null) {
      this.head = newNode
    }

    // 处理 tail
    // 先保留最后一个节点，再将原本最后一个节点的 next 指向新入队的节点，再将 tail 指向新入队的节点
    const tailNode = this.tail
    if (tailNode) {
      tailNode.next = newNode
    }
    this.tail = newNode

    // 记录长度
    this.len++
  }

  // 出队
  dequeue(): number | null {
    const headNode = this.head
    // 特殊情况的处理
    if (headNode === null) {
      return null
    }
    if (this.len === 0) {
      console.log('长度为 0')
      return null
    }

    // 修改指向
    this.head = headNode.next

    // 记录长度
    this.len--

    return headNode.value
  }

  get length(): number {
    return this.len
  }
}

// 功能测试
/* const q = new Queue()
q.enqueue(100)
q.enqueue(200)
q.enqueue(300)
console.log('初始队列长度为', q.length)
console.log('第一次出栈元素为', q.dequeue())
console.log('第二次出栈元素为', q.dequeue())
console.log('第三次出栈元素为', q.dequeue())
console.log('出栈后队列长度为', q.length) */

// 性能测试
console.time('使用链表实现队列')
const q = new Queue()
for (let i = 0; i < 100000; i++) {
  q.enqueue(i)
}
for (let i = 0; i < 100000; i++) {
  q.dequeue()
}
console.timeEnd('使用链表实现队列')

console.time('使用数组实现队列')
const arr = []
for (let i = 0; i < 100000; i++) {
  arr.push(i)
}
for (let i = 0; i < 100000; i++) {
  arr.shift()
}
console.timeEnd('使用数组实现队列')
