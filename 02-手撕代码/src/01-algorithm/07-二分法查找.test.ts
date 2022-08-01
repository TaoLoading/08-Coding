import { binarySearch1, binarySearch2 } from './07-二分法查找'

describe('二分查找', () => {
  it('正常情况', () => {
    const arr = [10, 20, 30, 40, 50]
    const target = 40
    const index = binarySearch1(arr, target)
    expect(index).toBe(3)
  })

  it('空数组', () => {
    expect(binarySearch1([], 100)).toBe(-1)
  })

  it('找不到 target', () => {
    const arr = [10, 20, 30, 40, 50]
    const target = 400
    const index = binarySearch1(arr, target)
    expect(index).toBe(-1)
  })
})