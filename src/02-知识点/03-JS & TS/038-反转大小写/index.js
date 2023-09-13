// 方法 1：正则表达式，性能较差
function reverseLetterCase1(str) {
  if (str.length === 0) {
    return str
  }

  let res = ''
  // 定义正则
  const reg1 = /[a-z]/
  const reg2 = /[A-Z]/
  for (let i = 0; i < str.length; i++) {
    const item = str[i]

    if (reg1.test(item)) {
      // 小写，切换为大写
      res += item.toUpperCase()
    } else if (reg2.test(item)) {
      // 大写，切换为小写
      res += item.toLowerCase()
    } else {
      res += item
    }
  }

  return res
}

// 方法 2：ASCII
function reverseLetterCase2(str) {
  if (str.length === 0) {
    return str
  }

  let res = ''
  for (let i = 0; i < str.length; i++) {
    const item = str[i]
    // 获得元素的ASCII
    const code = item.charCodeAt(0)

    if (code >= 97 && code <= 122) {
      // 小写，切换为大写
      res += item.toUpperCase()
    } else if (code >= 65 && code <= 90) {
      // 大写，切换为小写
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
// console.log('转换后的字符串为：', reverseLetterCase1(str))
console.log('转换后的字符串为：', reverseLetterCase2(str))

// 性能测试
/* const str = '100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz100aBcD$#xYz'
console.time('reverseLetterCase')
for (let i = 0; i < 10 * 10000; i++) {
  // reverseLetterCase1(str)
  reverseLetterCase2(str)
}
console.timeEnd('reverseLetterCase') */
