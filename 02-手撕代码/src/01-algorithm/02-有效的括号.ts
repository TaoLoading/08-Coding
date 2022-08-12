/**
 * 题目：给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s，判断 s 中的括号是否有效
 *      有效需要满足：1. 左括号必须用相同类型的右括号闭合  2. 左括号必须以正确的顺序闭合
 * 
 * 思路：1. 创建栈
 *       2. 遇到左括号压栈
 *       3. 遇到右括号就判断栈顶，匹配则出栈
 *       4. 判断栈的length是否为0，为0则有效
 * 
 * 重点：栈的使用
 */

/**
 * 判断括号是否匹配
 * @param left 左括号
 * @param right 右括号
 * @returns 匹配的结果
 */
function isMatch(left: string, right: string): boolean {
  if ((left === '{' && right === '}') || (left === '[' && right === ']') || (left === '(' && right === ')')) {
    return true
  } else {
    return false
  }
}

/**
 * 有效的括号
 * @param str 原字符串
 * @returns 匹配结果
 */
export function validBrackets(str: string): boolean {
  if (str.length === 0) {
    return true
  }

  const stack = []
  const leftBrackets = '{[('
  const rightBrackets = '}])'
  for (let i = 0; i < str.length; i++) {
    const s = str[i]

    if (leftBrackets.includes(s)) {
      // 匹配左括号入栈
      stack.push(s)
    } else if (rightBrackets.includes(s)) {
      // 匹配右括号判断栈顶
      const top = stack[stack.length - 1]
      if (isMatch(top, s)) {
        stack.pop()
      } else {
        return false
      }
    }
  }
  // 判断栈是否为空
  return stack.length === 0
}

/* const str = '[ad{)}]'
console.log('判断结果：', validBrackets(str)) */

/**
 * 时间复杂度为O(n)
 * 原因：进行了一次遍历，虽然在判断括号时的includes()也进行了遍历操作，但其操作的是括号字符串，
 *      未操作源字符串，并且括号字符串很短，所以整体时间复杂度为O(n)
 */
