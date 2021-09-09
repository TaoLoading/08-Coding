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

// 时间复杂度为O(n)，因为存在一个for循环，n为s.length
// 空间复杂度为O(n)，因为存在一个stack栈，极端情况时可能将s的全部即n个元素全部放进去