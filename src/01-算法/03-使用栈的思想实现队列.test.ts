import { describe, expect, it } from 'vitest'
import { Queue } from './03-使用栈的思想实现队列'

// 测试用例组
describe('两个栈实现一个队列', () => {
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
    q.enqueue(100)
    q.enqueue(200)
    q.enqueue(300)
    expect(q.dequeue()).toBe(100)
    expect(q.length).toBe(2)
    expect(q.dequeue()).toBe(200)
    expect(q.length).toBe(1)
  })
})
