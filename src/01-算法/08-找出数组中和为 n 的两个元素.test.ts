import { describe, expect, it } from 'vitest'
import { findTowNumbers1, findTowNumbers2 } from './08-找出数组中和为 n 的两个元素'

describe('两数之和', () => {
  it('正常情况', () => {
    const arr = [1, 2, 4, 7, 11, 15]
    const res = findTowNumbers1(arr, 15)
    expect(res).toEqual([4, 11])
  })

  it('空数组', () => {
    const res = findTowNumbers1([], 100)
    expect(res).toEqual([])
  })

  it('找不到结果', () => {
    const arr = [1, 2, 4, 7, 11, 15]
    const n = 100
    const res = findTowNumbers1(arr, n)
    expect(res).toEqual([])
  })
})