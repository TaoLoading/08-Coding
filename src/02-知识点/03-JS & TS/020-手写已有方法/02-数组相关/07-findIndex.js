/**
 * findIndex()
 * 作用：返回数组中满足回调函数的第一个元素的下标
 * 注意：1. 回调函数中传参依次为：item（元素）, index（下标，可不传）
 * 
 * @param {Function} callback 
 */
Array.prototype.myFindIndex = function (callback) {
  for (let i = 0; i < this.length; i++) {
    const item = this[i]
    const res = callback(item, i)
    if (res) {
      return i
    }
  }
  return -1
}

// 测试
const arr = [1, 3, 6, 9, 11, 15, 16]
console.log(arr.myFindIndex((item, index) => index % 2 == 0 && item > 8))
