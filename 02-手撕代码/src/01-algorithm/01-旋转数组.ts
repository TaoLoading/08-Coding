/**
 * 题目：将数组旋转k步后输出
 * 例：原数组为：[1, 2, 3, 4, 5]，k = 3，即旋转3步后为：[3, 4, 5, 1, 2, 3]
 * 重点：识破内置API的时间复杂度，如unshift()
 */

/**
 * 解法一：把末尾元素依次pop，再unshift到数组钱
 */
export function rotate1(arr: number[], k: number): number[] {
  const length = arr.length
  if (!k || length === 0) {
    return arr
  }
  // 计算排列次数。去除重复旋转之后的次数
  const step = Math.abs(k % length)

  for (let i = 0; i < step; i++) {
    const n = arr.pop()
    if (n != null) {
      arr.unshift(n) // 数组是一个有序结构，unshift()操作非常慢
    }
  }
  return arr
}

/**
 * 解法二：把后k项元素取出，直接放到数组最前面
 */
export function rotate2(arr: number[], k: number): number[] {
  const length = arr.length
  if (!k || length === 0) {
    return arr
  }
  const step = Math.abs(k % length)

  const part1 = arr.slice(-step)
  const part2 = arr.slice(0, length - step)
  const newArr = part1.concat(part2)
  return newArr
}

// 单元测试
/* const arr = [1, 2, 3, 4, 5, 6, 7]
console.log('结果是', rotate2(arr, 3)) */

// 性能测试
const testArr1 = []
for (let i = 0; i < 100000; i++) {
  testArr1.push(i)
}
const testArr2 = []
for (let i = 0; i < 100000; i++) {
  testArr2.push(i)
}

console.time('rotate1')
rotate1(testArr1, 90000)
console.timeEnd('rotate1')

console.time('rotate2')
rotate2(testArr2, 90000)
console.timeEnd('rotate2')

/**
 * rotate1：时间复杂度为O(n^2)
 * 原因：进行了一次for循环，又进行了unshift()操作
 *      由于数组是个连续内存空间，每次unshift()需要把每个元素都往后移动一位，故这部分是O(n)，所以整体为O(n^2)
 * 
 * rotate2：时间复杂度为O(1)
 * 原因：进行的都是平铺的操作
 *      虽然通过slice()操作了数组，但是slice()没有影响原数组，故时间复杂度为O(1)
 */
