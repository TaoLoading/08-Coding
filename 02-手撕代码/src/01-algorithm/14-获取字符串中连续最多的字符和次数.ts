/**
 * 题目：
 * 获取字符串中连续最多的字符和次数
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
function findConsecutiveChar1(str: string): resultType {
  const res: resultType = {
    char: '',
    num: 0
  }

  if (str.length === 0) {
    return res
  }

  // 记录当前字符连续出现的长度
  let charNum = 0
  for (let i = 0; i < str.length; i++) {
    // 重置次数
    charNum = 0

    for (let j = i; j < str.length; j++) {
      charNum++

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

// 功能测试
const str = 'aabbcccddeeee11223'
console.log(findConsecutiveChar1(str))
