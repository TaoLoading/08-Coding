/**
 * 题目：实现一个二分法查找
 * 
 * 采用非递归方式：性能更好
 * 采用递归方式：代码逻辑更清晰
 * 
 * 时间复杂度：O(logn)
 */

/**
 * 采用递归方式实现二分法
 * @param arr 有序数组
 * @param target 目标数字
 * @returns 目标数字存在时则返回其下标，不存在时则返回-1
 */
export function binarySearch1(arr: number[], target: number): number {
  if (arr.length < 0) {
    return -1
  }

  // 二分查找的开始与结束位置。逐步缩小
  let startIndex = 0
  let endIndex = arr.length - 1

  while (startIndex <= endIndex) {
    // 中间位置
    const middleIndex = Math.floor((startIndex + endIndex) / 2)
    const middleValue = arr[middleIndex]
    if (middleValue > target) {
      // 目标值在左边
      endIndex = middleIndex - 1
    } else if (middleValue < target) {
      // 目标值在右边
      startIndex = middleIndex + 1
    } else {
      // 找到目标值
      return middleIndex
    }
  }

  return -1
}

/**
 * 采用递归方式实现二分法
 * @param arr 有序数组
 * @param target 目标数字
 * @param startIndex 二分查找起始位置（递归时使用）
 * @param endIndex 二分查找结束位置（递归时使用）
 * @returns 目标数字存在时则返回其下标，不存在时则返回-1
 */
export function binarySearch2(arr: number[], target: number, startIndex?: number, endIndex?: number): number {
  if (arr.length < 0) {
    return -1
  }

  if (startIndex === undefined) {
    startIndex = 0
  }
  if (endIndex === undefined) {
    endIndex = arr.length - 1
  }

  // 起始位置大于结束位置，则没有找到
  if (startIndex > endIndex) {
    return -1
  }
  // 中间位置
  const middleIndex = Math.floor((startIndex + endIndex) / 2)
  const middleValue = arr[middleIndex]

  if (middleValue > target) {
    // 目标值在左边
    return binarySearch2(arr, target, startIndex, middleIndex - 1)
  } else if (middleValue < target) {
    // 目标值在右边
    return binarySearch2(arr, target, middleIndex + 1, endIndex)
  } else {
    // 找到目标值
    return middleIndex
  }
}

// 功能测试
/* const arr = [10, 20, 30, 40, 50, 60]
const target = 20
console.log('目标值的下标为：', binarySearch2(arr, target)) */

// 性能测试
const arr = [10, 20, 30, 40, 50, 60]
const target = 20
console.time('binarySearch1')
for (let i = 0; i < 100000; i++) {
  binarySearch1(arr, target)
}
console.timeEnd('binarySearch1')
console.time('binarySearch2')
for (let i = 0; i < 100000; i++) {
  binarySearch2(arr, target)
}
console.timeEnd('binarySearch2')
