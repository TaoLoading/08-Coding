/**
 * arrayRotate的单元测试
 */

import { rotate1, rotate2 } from './01-旋转数组'

// 测试用例组
describe('旋转数组', () => {
  // 以下每个it为单个测试用例

  // 普通情况
  it('普通情况', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const k = 3
    const result = rotate1(arr, k)
    // 期望结果
    expect(result).toEqual([5, 6, 7, 1, 2, 3, 4]) // toEqual()用于判断对象或数组
  })

  // 数组为空
  it('数组为空', () => {
    const result = rotate1([], 3)
    // 期望结果
    expect(result).toEqual([])
  })

  // k是负数
  it('k是负数', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const k = -3
    const result = rotate1(arr, k)
    // 期望结果
    expect(result).toEqual([5, 6, 7, 1, 2, 3, 4])
  })

  // k是0
  it('k是0', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const k = 0
    const result = rotate1(arr, k)
    // 期望结果
    expect(result).toEqual(arr)
  })

  // k不是数字
  /**
   * 当k不是数字时，Math.abs(k % length) 后的值即step为NAN,
   * 放到for循环中，由于step值为NAN，则直接跳出for循环，故返回的值还是初始的arr
   */
  it('k不是数字', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    const k = 'a'
    // @ts-ignore
    const result = rotate1(arr, k)
    // 期望结果
    expect(result).toEqual(arr)
  })
})
