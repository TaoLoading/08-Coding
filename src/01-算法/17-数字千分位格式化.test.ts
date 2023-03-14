import { describe, expect, it } from 'vitest'
import { format1, format2 } from './17-数字千分位格式化'

describe('数组千分位格式化', () => {
  it('正常', () => {
    const n = 10201004050
    const res = format1(n)
    expect(res).toBe('10,201,004,050')
  })
  it('小于 1000', () => {
    expect(format1(0)).toBe('0')
    expect(format1(10)).toBe('10')
  })
})