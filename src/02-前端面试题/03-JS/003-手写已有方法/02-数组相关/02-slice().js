/**
 * slice()
 * 作用：返回一个由 start 和 end 决定的原数组的浅拷贝。该方法不会改变原数组
 * 注意：
 * 1. 只传入 start 时，即从 start 开始截取一直到最后，start 可以为负值
 * 2. 当 start 超出数组索引范围时，返回一个空数组
 * 
 * @param {Number} start 索引起始值，从 0 开始
 * @param {Number} end 索引终止值
 */
Array.prototype.mySlice = function (start = null, end = null) {
  const newArr = []

  // 修正 end 值
  if (start !== null && (end === null || end > arr.length - 1)) {
    end = arr.length - 1
  }

  // 情况 1：未传入起始值
  if (start === null) {
    return arr
  }

  // 情况 2：起始值超出范围
  if (start > arr.length - 1) {
    return []
  }

  if (start >= 0) {
    // 情况 3：start 为正值或 0
    for (let i = start; i <= end; i++) {
      newArr.push(arr[i])
    }
  } else {
    // 情况 4：start 为负值
    for (let i = arr.length + start; i <= end; i++) {
      newArr.push(arr[i])
    }
  }

  return newArr
}
// 测试
const arr = [1, 2, 3, 4, 5]
const newArr1 = arr.mySlice(0)
console.log('newArr1', newArr1)
const newArr2 = arr.mySlice(1)
console.log('newArr2', newArr2)
const newArr3 = arr.mySlice(-3)
console.log('newArr3', newArr3)
const newArr4 = arr.mySlice(1, 3)
console.log('newArr4', newArr4)
const newArr5 = arr.mySlice(-2, 9)
console.log('newArr5', newArr5)