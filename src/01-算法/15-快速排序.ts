/**
 * 题目：
 * 实现快速排序，并说明时间复杂度
 * 
 * 思路：
 * 1. 找到中间元素midValue
 * 2. 遍历数组，小于midValue放到leftArr数组，大于或等于midValue放到rightArr数组
 * 3. 递归，对leftArr和rightArr数组进行排序
 * 4. 拼接left和right数组并返回排序后的数组
 * 
 * 时间复杂度：
 * O(nlogn)：一层循环O(logn) * 一层二分O(logn)
 */

/**
 * 使用splice()，会修改原数组
 * @param arr 原始数组
 * @returns 排序后的数组
 */
export function quickSort1(arr: number[]): number[] {
  if (arr.length === 0) {
    return arr
  }

  // 找到中间元素
  const midIndex = Math.floor(arr.length / 2)
  const midValue = arr.splice(midIndex, 1)[0] // 注意splice()修改了原数组

  const leftArr: number[] = []
  const rightArr: number[] = []

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item < midValue) {
      leftArr.push(item)
    } else {
      rightArr.push(item)
    }
  }

  return quickSort1(leftArr).concat([midValue], quickSort1(rightArr))
}

/**
 * 使用slice()，不会修改原数组
 * @param arr 原始数组
 * @returns 排序后的数组
 */
export function quickSort2(arr: number[]): number[] {
  if (arr.length === 0) {
    return arr
  }

  // 找到中间元素
  const midIndex = Math.floor(arr.length / 2)
  const midValue = arr.slice(midIndex, midIndex + 1)[0] // 注意splice()修改了原数组

  const leftArr: number[] = []
  const rightArr: number[] = []

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item < midValue) {
      leftArr.push(item)
    } else {
      rightArr.push(item)
    }
  }

  return quickSort1(leftArr).concat(quickSort1(rightArr))
}

// 功能测试
/* const arr = [1, 6, 2, 7, 9, 8, 4, 3, 5]
// console.log(quickSort1(arr))
console.log(quickSort2(arr)) */

// 性能测试
const arr = []
for (let i = 0; i < 10 * 10000; i++) {
  arr.push(Math.floor(Math.random() * 1000))
}
console.time('quickSort1')
// quickSort1(arr)
quickSort2(arr)
console.timeEnd('quickSort1')
