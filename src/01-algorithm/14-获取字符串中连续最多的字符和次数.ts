/**
 * 题目：
 * 获取字符串中连续最多的字符和次数
 * 
 * 双指针方法思路：
 * 1. 定义指针i和j，j不动，i向后移动
 * 2. 如果i和j的值一直相等，i继续向后移动
 * 3. 如果i和j的值不相等，则记录，并让j追上i
 * 4. 重复上述操作直到结束
 */

interface resultType {
  char: string,
  num: number
}

/**
 * 循环嵌套方法
 * @param str 原始字符串
 * @returns 结果
 * 时间复杂度为O(n)。虽然存在两层嵌套，但是存在跳步的现象，即i会从下一个不同的字符处继续开始循环
 */
export function findConsecutiveChar1(str: string): resultType {
  const res: resultType = {
    char: '',
    num: 0
  }

  if (str.length === 0) {
    return res
  }

  // 记录当前字符连续出现的次数
  let charNum = 0
  for (let i = 0; i < str.length; i++) {
    // 重置次数
    charNum = 0

    for (let j = i; j < str.length; j++) {
      // 连续时，次数+1
      if (str[i] === str[j]) {
        charNum++
      }

      if (str[i] !== str[j] || j === str.length - 1) {
        // 不再连续或字符串到头时，进行比较
        if (charNum > res.num) {
          res.char = str[i]
          res.num = charNum
        }

        // 跳到下一个字符起点
        if (i < length - 1) {
          i = j - 1
        }

        break
      }
    }
  }

  return res
}

/**
 * 双指针方法
 * @param str 原始字符串
 * @returns 结果
 * 时间复杂度为O(n)
 */
export function findConsecutiveChar2(str: string): resultType {
  const res: resultType = {
    char: '',
    num: 0
  }

  if (str.length === 0) {
    return res
  }

  // 记录当前字符连续出现的次数
  let charNum = 0
  let i
  let j = 0
  for (i = 0; i < str.length; i++) {
    // 连续时，次数+1
    if (str[j] === str[i]) {
      charNum++
    }

    // 不再连续或字符串到头时，进行比较
    if (str[j] !== str[i] || i === str.length - 1) {
      if (charNum > res.num) {
        res.char = str[j]
        res.num = charNum
      }
      // 重置次数
      charNum = 0

      // j追上i
      if (i < str.length - 1) {
        j = i
        // 细节，防止i和j错开
        i--
      }
    }
  }

  return res
}

// 功能测试
/* const str = 'aabbcccddeeee11223'
console.log(findConsecutiveChar2(str)) */

// 性能测试
let str = ''
for (let i = 0; i < 100000; i++) {
  str += i.toString()
}
console.time('findConsecutiveChar')
findConsecutiveChar1(str)
// findConsecutiveChar2(str)
console.timeEnd('findConsecutiveChar')
