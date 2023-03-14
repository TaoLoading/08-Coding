/**
 * arrayRotate 的单元测试
 */

import { describe, expect, it } from 'vitest'
import { rotate1, rotate2 } from './01-旋转数组'

// 测试用例组
describe('旋转数组', () => {
  // 以下每个 it 为单个测试用例

  it('正常情况', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const k = 3
    const result = rotate1(arr, k)
    // 期望结果
    expect(result).toEqual([5, 6, 7, 1, 2, 3, 4]) // toEqual() 用于判断对象或数组
  })

  it('数组为空', () => {
    const result = rotate1([], 3)
    expect(result).toEqual([])
  })

  it('k 是负数', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const k = -3
    const result = rotate1(arr, k)
    expect(result).toEqual([5, 6, 7, 1, 2, 3, 4])
  })

  it('k 是 0', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const k = 0
    const result = rotate1(arr, k)
    expect(result).toEqual(arr)
  })

  // k 不是数字
  /**
   * 当 k 不是数字时，Math.abs(k % length) 后的值即 step 为 NAN,
   * 放到 for 循环中，由于 step 值为 NAN，则直接跳出 for 循环，故返回的值还是初始的 arr
   */
  it('k 不是数字', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const k = 'a'
    // @ts-ignore
    const result = rotate1(arr, k)
    // 期望结果
    expect(result).toEqual(arr)
  })
})
