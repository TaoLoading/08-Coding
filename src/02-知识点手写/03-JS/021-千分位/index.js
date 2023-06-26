function formatNumberWithCommas(number) {
  // 将数字转换为字符串
  let str = number.toString()

  // 格式化整数部分和小数部分
  let parts = str.split('.')
  let integerPart = parts[0]
  let integerArr = integerPart.split('')
  let decimalPart = parts.length > 1 ? '.' + parts[1] : ''

  // 将整数部分每三位添加逗号
  for (let i = integerArr.length - 3; i > 0; i -= 3) {
    integerArr.splice(i, 0, ',')
  }

  // 返回格式化后的结果
  return integerArr.join('') + decimalPart
}

console.log(formatNumberWithCommas(1234567)) // 1,234,567
console.log(formatNumberWithCommas(9876543.21)) // 9,876,543.21
console.log(formatNumberWithCommas(1000)) // 1,000
