/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s，判断字符串是否有效
 * 有效字符串需满足：
 * 1.左括号必须用相同类型的右括号闭合
 * 2.左括号必须以正确的顺序闭合
 */

var isValid = function (s) {
  if (s.length % 2 == 1) return false
  const stack = []
  const map = new Map()
  map.set('(', ')')
  map.set('[', ']')
  map.set('{', '}')
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (map.has(c)) {
      stack.push(c)
    } else {
      // 获取栈顶元素
      const t = stack[stack.length - 1]
      if (map.get(t) === c) {
        // 将栈顶元素出栈
        stack.pop()
      } else {
        return false
      }
    }
  }
  return stack.length === 0
}

// 使用字典简化了代码
// 时间复杂度为 O(n)
// 空间复杂度为 O(n)，虽然存在一个 map，但其内部变量都是固定好的常量，不会发生线性增长，故该 map 的空间复杂度是 O(1)，不会影响整体的空间复杂度为