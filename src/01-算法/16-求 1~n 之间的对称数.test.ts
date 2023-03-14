import { describe, expect, it } from 'vitest'
import { findPalindromeNumber1, findPalindromeNumber2, findPalindromeNumber3 } from './16-求 1~n 之间的对称数'

describe('对称数', () => {
  it('正常情况', () => {
    const numbers = findPalindromeNumber3(200)
    expect(numbers.length).toBe(29)
  })
  it('max 小于等于 0', () => {
    const numbers = findPalindromeNumber3(0)
    expect(numbers).toEqual([])
  })
})