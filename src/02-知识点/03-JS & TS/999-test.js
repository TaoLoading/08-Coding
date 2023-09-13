function reverseLetterCase(str) {
  if (str.length === 0) {
    return str
  }

  let res = ''

  for (let i = 0; i < str.length; i++) {
    const item = str[i]
    const code = item.charCodeAt(0)

    if (code >= 97 && code <= 122) {
      res += item.toUpperCase()
    } else if (code >= 65 && code <= 90) {
      res += item.toLowerCase()
    } else {
      res += item
    }
  }

  return res
}

// 功能测试
const str = '100aBcD$#xYz'
console.log('原字符串为：', str)
console.log('转换后的字符串为：', reverseLetterCase(str))
