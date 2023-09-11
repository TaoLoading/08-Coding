/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s，判断字符串是否有效
 * 有效字符串需满足：
 * 1. 左括号必须用相同类型的右括号闭合
 * 2. 左括号必须以正确的顺序闭合
 */

const isValid = function (s) {
  // 当栈的长度为奇数时，则立即断定不合法
  if (s.length % 2 == 1) return false
  const stack = []
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    // 如果传入的元素是左括号，入栈
    if (c === '(' || c === '[' || c === '{') {
      stack.push(c)
    } else {
      // 如果传入的元素是右括号，先获取栈顶元素，再将传入的元素与栈顶元素匹配
      // 匹配成功则将栈顶元素出栈，匹配不成功则断定不合法
      const t = stack[stack.length - 1]
      if (
        (t === '(' && c === ')') ||
        (t === '[' && c === ']') ||
        (t === '{' && c === '}')
      ) {
        stack.pop()
      } else {
        return false
      }
    }
  }
  // 当栈的长度为 0 时，则证明传入的元素全部合法
  return stack.length === 0
}

// 时间复杂度为 O(n)，因为存在一个 for 循环，n 为 s.length
// 空间复杂度为 O(n)，因为存在一个 stack 栈，极端情况时可能将 s 的全部即 n 个元素全部放进去
