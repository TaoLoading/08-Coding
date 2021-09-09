// 此解题方式时间复杂度和空间复杂度都为

var isValid = function (s) {
  if (s.length % 2 == 1) return false
  const stack = []
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (c === '(' || c === '[' || c === '{') {
      stack.push(c)
    } else {
      // 获取栈顶元素
      const t = stack[stack.length - 1]
      if (
        (t === '(' && c === ')') ||
        (t === '[' && c === ']') ||
        (t === '{' && c === '}')
      ) {
        // 将栈顶元素出栈
        stack.pop()
      } else {
        return false
      }
    }
  }
  return stack.length === 0
}