import { findConsecutiveChar1, findConsecutiveChar2 } from './14-获取字符串中连续最多的字符和次数'

describe('连续字符和长度', () => {
  it('正常情况', () => {
    const str = 'aabbcccddeeee11223'
    const res = findConsecutiveChar2(str)
    expect(res).toEqual({ char: 'e', num: 4 })
  })
  it('空字符串', () => {
    const res = findConsecutiveChar2('')
    expect(res).toEqual({ char: '', num: 0 })
  })
  it('无连续字符', () => {
    const str = 'abc'
    const res = findConsecutiveChar2(str)
    // 无连续字符时则输出第一个
    expect(res).toEqual({ char: 'a', num: 1 })
  })
  it('全部都是连续字符', () => {
    const str = 'aaa'
    const res = findConsecutiveChar2(str)
    expect(res).toEqual({ char: 'a', num: 3 })
  })
})
