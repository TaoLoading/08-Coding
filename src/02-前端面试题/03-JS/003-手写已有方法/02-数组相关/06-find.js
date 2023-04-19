/**
 * find()
 * 作用：返回数组中满足回调函数的第一个元素的值
 * 注意：1. 回调函数中传参依次为：item（元素）, index（下标，可不传）
 * 
 * @param {Function} callback 
 */
Array.prototype.myFind = function (callback) {
  for (let i = 0; i < this.length; i++) { // 注意，此处用的 for 而不是 foreach，因为 foreach 与 for 机制不同，在return跳出循环时不能结束整个循环
    const item = this[i]
    const res = callback(item, i)
    if (res) {
      return item
    }
  }
  return undefined
}

// 测试
const arr = [1, 3, 6, 9, 11, 15, 16]
console.log(arr.myFind((item, index) => index % 2 == 0 && item > 8))