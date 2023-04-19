/**
 * some()
 * 作用：将数组中的每个元素经过回调函数判断，有一个成立返回 true，否则返回 false
 * 注意：1. 回调函数中传参依次为：item（元素）, index（下标，可不传）
 * 
 * @param {Function} callback 
 */
Array.prototype.myEvery = function (callback) {
  for (let i = 0; i < this.length; i++) {
    const item = this[i]
    const res = callback(item)
    if (res) {
      return true
    }
  }
  return false
}

// 测试
const arr = [2, 4, 6, 8, 9, 10]
console.log(arr.myEvery((item) => item % 2 == 1))