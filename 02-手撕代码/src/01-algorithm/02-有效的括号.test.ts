import { validBrackets } from './02-有效的括号'

// 测试用例组
describe('有效的括号', () => {
  // 以下每个it为单个测试用例

  it('正常情况', () => {
    const str = '[(a{b})]'
    const result = validBrackets(str)
    expect(result).toBe(true) // toBe()用于判断基本数据类型
  })

  it('括号不匹配', () => {
    const str = '[(a{b)c]'
    const result = validBrackets(str)
    expect(result).toBe(false)
  })

  it('括号顺序错误', () => {
    const str = '[(a{)b}c]'
    const result = validBrackets(str)
    expect(result).toBe(false)
  })

  it('空字符串', () => {
    const str = ''
    const result = validBrackets(str)
    expect(result).toBe(true)
  })
})
