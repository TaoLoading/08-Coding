/**
 * 题目：递增数组中有两个数和为n，找出这两个数
 * 
 * 思路：利用二分思想使用双指针查找
 *      1. 取头部和尾部指针
 *      2. 两和大于目标值时，尾指针向前一点
 *      3. 两和小于目标值时，头指针向后一点
 * 
 * 重点：1. 此处利用的是思想，二分法则是要将数组逐步减半，此处未减半
 *      2. 针对于有序数组的查询，可考虑二分思想
 *      3. 针对优化嵌套循环，可考虑双指针
 */

/**
 * 嵌套循环
 * 复杂度为O(n^2)，复杂度较大不可取
 * @param arr 递增数组
 * @param n 目标值
 */
export function findTowNumbers1(arr: number[], n: number): number[] {
  const res: number[] = []

  if (arr.length === 0) {
    return res
  }

  for (let i = 0; i < arr.length - 1; i++) {
    const n1 = arr[i]

    for (let j = i + 1; j < arr.length; j++) { // 注意j从i+1，因为j不能与i为同一个数
      const n2 = arr[j]

      if (n1 + n2 === n) {
        res.push(n1)
        res.push(n2)
        return res
      }
    }
  }

  return res
}

/**
 * 利用二分思想使用双指针查找
 * 复杂度为O(n)
 * @param arr 递增数组
 * @param n 目标值
 */
export function findTowNumbers2(arr: number[], n: number): number[] {
  const res: number[] = []
  if (arr.length <= 0) {
    return res
  }

  let startIndex = 0
  let endIndex = arr.length - 1

  while (startIndex < endIndex) {
    const n1 = arr[startIndex]
    const n2 = arr[endIndex]
    const sum = n1 + n2
    if (sum > n) {
      endIndex--
    } else if (sum < n) {
      startIndex++
    } else {
      res.push(n1, n2)
      return res
    }
  }

  return res
}

// 功能测试
const arr = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 4, 7, 11, 15]
// console.log(findTowNumbers1(arr, 15))
console.log(findTowNumbers2(arr, 15))

// 性能测试
/* const arr = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 4, 7, 11, 15]
console.time('findTowNumbers1')
for (let i = 0; i < 100 * 10000; i++) {
  findTowNumbers1(arr, 15)
}
console.timeEnd('findTowNumbers1')

console.time('findTowNumbers2')
for (let i = 0; i < 100 * 10000; i++) {
  findTowNumbers2(arr, 15)
}
console.timeEnd('findTowNumbers2') */
