import { describe, expect, it } from 'vitest'
import { quickSort1, quickSort2 } from './15-快速排序'

describe('快速排序', () => {
  it('正常情况', () => {
    const arr = [1, 6, 2, 7, 3, 8, 4, 9, 5]
    const res = quickSort2(arr)
    expect(res).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })
  it('有负数', () => {
    const arr = [-2, 2, -3, 1]
    const res = quickSort2(arr)
    expect(res).toEqual([-3, -2, 1, 2])
  })
  it('数组元素都一样', () => {
    const arr = [2, 2, 2, 2]
    const res = quickSort2(arr)
    expect(res).toEqual([2, 2, 2, 2])
  })
  it('空数组', () => {
    const res = quickSort2([])
    expect(res).toEqual([])
  })
})
