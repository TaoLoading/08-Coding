/**
 * 题目：
 * 求1~n之间的对称数/回文
 * 
 * 思路一：整体字符串反转
 * 1. 数字转换为字符串，在转换为数组
 * 2. 反转数组，再转换为字符串
 * 3. 前后字符串对比
 * 
 * 思路二：单对字符反转
 * 1. 数字转换为字符串
 * 2. 字符串对应位置的单对字符进行比较
 * 
 * 思路三：生成翻转数
 * 1. 使用 % 和 Math.floor() 生成翻转数
 * 2. 直接比较当前数与翻转数
 */

/**
 * 整体字符串反转
 * @param max 最大值，即n
 * @returns 包含对称数的数组
 */
export function findPalindromeNumber1(max: number): number[] {
  const res: number[] = []

  if (max <= 0) {
    return res
  }

  for (let i = 0; i < max; i++) {
    const s = i.toString()
    // 原字符串与反转后的字符串对比
    if (s === s.split('').reverse().join('')) {
      res.push(i)
    }
  }

  return res
}

/**
 * 单对字符反转
 * @param max 最大值，即n
 * @returns 包含对称数的数组
 */
export function findPalindromeNumber2(max: number): number[] {
  const res: number[] = []

  if (max <= 0) {
    return res
  }

  for (let i = 0; i < max; i++) {
    const s = i.toString()
    // 标记是否为回文
    let flag = true
    let startIndex = 0
    let endIndex = s.length - 1
    while (startIndex < endIndex) {
      if (s[startIndex] !== s[endIndex]) {
        // 不相等则标记为false，并跳出该数字的标记
        flag = false
        break
      } else {
        // 相等则进行下一对字符的比较
        startIndex++
        endIndex--
      }
    }

    // flag为true，证明该数字的每个字符都通过了比较，即回文
    if (flag) {
      res.push(i)
    }
  }

  return res
}

/**
 * 生成翻转数
 * @param max 最大值，即n
 * @returns 包含对称数的数组
 */
export function findPalindromeNumber3(max: number): number[] {
  const res: number[] = []

  if (max <= 0) {
    return res
  }

  for (let i = 0; i <= max; i++) {
    let n = i
    // 翻转数
    let rev = 0

    // 生成翻转数
    while (n > 0) {
      // 以123为例
      rev = rev * 10 + n % 10 // rev: 3   32  321
      n = Math.floor(n / 10)  // n:   12  1   0
    }

    if (i === rev) {
      res.push(i)
    }
  }

  return res
}

// 功能测试
console.log('100以内的对称数', findPalindromeNumber1(200))
console.log('100以内的对称数', findPalindromeNumber2(200))
console.log('100以内的对称数', findPalindromeNumber3(200))

// 性能测试
/* console.time('findPalindromeNumber')
// findPalindromeNumber1(100 * 10000)
// findPalindromeNumber2(100 * 10000)
findPalindromeNumber3(100 * 10000)
console.timeEnd('findPalindromeNumber') */