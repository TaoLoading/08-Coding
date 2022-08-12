/**
 * 题目：
 * 将数组中的0移动到末尾，如[0, 1, 3, 0]输出为[1, 3, 0, 0]，必须在原数组进行操作
 * 
 * 双指针方法思路：
 * 1. 定义两个指针，j指向第一个0，i指向j后面的第一个非0
 * 2. 交换i和j的值，并继续向后移动，每次移动一步
 * 3. 只遍历1次，时间复杂度是O(n)
 */

/**
 * 遍历数组，遇0 push到末尾，splice截取掉该元素
 * @param arr 初始数组
 * @returns 处理后的数组
 * 时间复杂度为O(n^2)。循环为O(n)，splice()为O(n)
 */
export function moveZero1(arr: number[]): number[] {
  if (arr.length === 0) {
    return arr
  }

  let zeroLength = 0
  for (let i = 0; i < arr.length - zeroLength; i++) {
    if (arr[i] === 0) {
      arr.push(0)
      arr.splice(i, 1)
      zeroLength++
      // 数组截取1个元素后i要减1，否则遇到连续0时会出错。[1, 0, 0, 0, 1]
      i--
    }
  }
  return arr
}

/**
 * 使用双指针
 * @param arr 初始数组
 * @returns 处理后的数组
 */
export function moveZero2(arr: number[]): number[] {
  if (arr.length === 0) {
    return arr
  }

  let i
  let j = -1
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === 0 && j === -1) {
      // 此时j指向第一个0
      j = i
    }

    if (arr[i] !== 0 && j >= 0) { // 没有特定指定i的指向，因为arr[i]本身就限制了i的指向，即j后第一个非0
      // 交换
      const n = arr[i]
      arr[i] = arr[j]
      arr[j] = n

      // 交换完毕向后移动一步
      j++
    }
  }
  return arr
}

// 功能测试
const arr = [1, 0, 3, 4, 0, 0, 11, 0]
console.log('将数组中的0移动到末尾', moveZero1(arr))
// console.log('将数组中的0移动到末尾', moveZero2(arr))

// 性能测试
const testArr = []
for (let i = 0; i < 20 * 10000; i++) {
  if (i % 10 === 0) {
    testArr.push(0)
  } else {
    testArr.push(i)
  }
}

/* console.time('moveZero1')
moveZero1(testArr)
console.timeEnd('moveZero1')
console.time('moveZero2')
moveZero2(testArr)
console.timeEnd('moveZero2') */
