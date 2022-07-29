import { createLinkList, reverseLinkList } from './05-反转单向链表'

describe('反转单向链表', () => {
  it('单个元素', () => {
    const linkList = createLinkList([100])
    const reLinkList = reverseLinkList(linkList)
    expect(reLinkList).toEqual({ value: 100 })
  })

  it('多个元素', () => {
    const linkList = createLinkList([100, 200, 300])
    const reLinkList = reverseLinkList(linkList)
    expect(reLinkList).toEqual({
      value: 300,
      next: {
        value: 200,
        next: {
          value: 100
        }
      }
    })
  })
})
