/**
 * 题目：将数组旋转k步后输出
 * 例：原数组为：[1, 2, 3, 4, 5]，k = 3，即旋转3步后为：[5, 4, 3 ,1, 2]
 */

/**
 * 解法一：把末尾元素依次pop，再unshift到数组钱
 */
export function rotate1(arr: number[], k: number): number[] {
  const length = arr.length
  if (!k || length === 0) {
    return arr
  }
  // 计算排列次数
  const step = Math.abs(k % length)

  for (let i = 0; i < step; i++) {
    const n = arr.pop()
    if (n != null) {
      arr.unshift(n)
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
const testArr = []
for (let i = 0; i < 100000; i++) {
  testArr.push(i)
}

console.time('rotate1')
rotate1(testArr, 90000) // 时间复杂度为O(n^2)
console.timeEnd('rotate1')

console.time('rotate2')
rotate2(testArr, 90000) // 时间复杂度为O(1)
console.timeEnd('rotate2')
