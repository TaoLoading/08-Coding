/**
 * 思路：对整数位每三位进行切割，从第 length-3 位由后往前拼接逗号
 */

function formatNumber(num) {
  // 将数字转换为字符串
  const numStr = num.toString()

  // 格式化整数部分和小数部分
  const parts = numStr.split('.')
  const intStr = parts[0]
  const decimalStr = parts[1] ? '.' + parts[1] : ''
  const intStrArr = intStr.split('')

  // 将整数部分每三位添加逗号
  for (let i = intStrArr.length - 3; i > 0; i -= 3) {
    intStrArr.splice(i, 0, ',')
  }

  return intStrArr.join('') + decimalStr
}

console.log(formatNumber(1234567)) // 1,234,567
console.log(formatNumber(9876543.21)) // 9,876,543.21
console.log(formatNumber(1000)) // 1,000
