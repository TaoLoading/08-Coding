import { fibonacci1, fibonacci2 } from './11-斐波那契数列'

describe('斐波那契数列', () => {
  it('0和1', () => {
    expect(fibonacci2(0)).toBe(0)
    expect(fibonacci2(1)).toBe(1)
  })
  it('正常情况', () => {
    expect(fibonacci2(2)).toBe(1)
    expect(fibonacci2(3)).toBe(2)
    expect(fibonacci2(6)).toBe(8)
  })
  it('n小于0', () => {
    expect(fibonacci2(-1)).toBe(0)
  })
})