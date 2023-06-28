// 方法 1：split() + reverse() + join()
function reverseString1(str) {
  return str.split('').reverse().join('')
}

// 方法 2：for 循环迭代
function reverseString2(str) {
  let reversed = ''
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i]
  }
  return reversed
}

// 测试
const str = 'abcd123efg678999'
console.log('reverseString1(str)', reverseString1(str))
console.log('reverseString2(str)', reverseString2(str))
