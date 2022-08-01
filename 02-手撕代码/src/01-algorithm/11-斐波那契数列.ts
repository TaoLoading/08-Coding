/**
 * 题目：计算斐波那契数列的第n个值
 */

/**
 * 递归方式
 * @param n 下标
 * @returns 值
 * 时间复杂度是O(2^n)，存在重复计算
 */
export function fibonacci1(n: number): number {
  // 特殊值处理
  if (n <= 0) {
    return 0
  }
  if (n === 1) {
    return 1
  }

  return fibonacci1(n - 1) + fibonacci1(n - 2)
}

/**
 * 循环方式
 * @param n 下标
 * @returns 值
 * 时间复杂度是O(n)
 */
export function fibonacci2(n: number): number {
  // 特殊值处理
  if (n <= 0) {
    return 0
  }
  if (n === 1) {
    return 1
  }

  // 记录 n-1 的结果
  let n1 = 1
  // 记录 n-2 的结果
  let n2 = 0
  // 记录 n1 + n2 的结果，即下一个值
  let res = 0

  for (let i = 2; i <= n; i++) {
    res = n1 + n2
    n2 = n1
    n1 = res
  }

  return res
}

// 功能测试
console.log('斐波那契数列中第10个值为', fibonacci2(10))
