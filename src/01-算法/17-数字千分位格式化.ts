/**
 * 题目：
 * 将数字千分位格式化，输出字符串。例输入 11011001，输出为 11,011,001
 */

/**
 * 转换为字符串后转换为数组，反转后拼接
 * @param n 初始数字
 * @returns 转换后的字符串
 */
export function format1(n: number): string {
  // 只考虑整数部分
  n = Math.floor(n)

  const s = n.toString()
  // 反转字符串
  const arr = s.split('').reverse()
  // 拼接字符串
  return arr.reduce((acc, value, index) => {
    if (index % 3 === 0) {
      if (acc) {
        // 非第一次到三位数，加逗号
        return value + ',' + acc
      } else {
        // 第一次到三位数，不加逗号直接返回
        return value
      }
    } else {
      return value + acc
    }
  }, '')
}

/**
 * 转换为字符串，对字符串做拼接
 * @param n 初始数字
 * @returns 转换后的字符串
 */
export function format2(n: number): string {
  // 只考虑整数部分
  n = Math.floor(n)

  let res = ''
  const s = n.toString()
  for (let i = s.length - 1; i >= 0; i--) {
    let j = s.length - i
    // 每三位数拼接一次
    if (j % 3 === 0) {
      if (i === 0) {
        // 最开头一个数，不加逗号
        res = s[i] + res
      } else {
        // 非开头一个数，前面加逗号
        res = ',' + s[i] + res
      }
    } else {
      res = s[i] + res
    }
  }

  return res
}

// 功能测试
const n = 11011001
console.log('format1', format1(n))
// console.log('format2', format2(n))
