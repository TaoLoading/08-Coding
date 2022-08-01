import { Queue } from './06-使用链表实现队列'

describe('使用链表实现队列', () => {
  it('入栈', () => {
    const q = new Queue()
    expect(q.length).toBe(0)

    q.enqueue(100)
    q.enqueue(200)
    q.enqueue(300)
    expect(q.length).toBe(3)
  })

  it('出栈', () => {
    const q = new Queue()
    expect(q.dequeue()).toBeNull()

    q.enqueue(100)
    q.enqueue(200)
    q.enqueue(300)
    expect(q.dequeue()).toBe(100)
    expect(q.dequeue()).toBe(200)
    expect(q.dequeue()).toBe(300)
    expect(q.dequeue()).toBeNull()
  })
})
