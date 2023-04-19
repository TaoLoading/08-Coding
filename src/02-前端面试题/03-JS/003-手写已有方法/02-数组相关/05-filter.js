/**
 * filter()
 * 作用：将数组中的每个元素经过回调函数判断，将判断为 true 的值依次放入新数组后返回。该方法不会改变原数组
 * 注意：
 * 1. 回调函数中传参依次为：item（元素）, index（下标，可不传）
 * 2. filter() 与 map() 的区别在于操作逻辑，map 是将参数放入回调函数后执行，而 filter 是判断，返回判断结果为 true 的值
 * 
 * @param {Function} callback 
 */
Array.prototype.myFilter = function (callback) {
  const newArr = []
  this.forEach(item => {
    const res = callback(item, arr.indexOf(item) + 1) // arr.indexOf(element) + 1 是元素的下标
    if (res) {
      newArr.push(item)
    }
  })
  return newArr
}

// 测试
const arr = [1, 3, 6, 9, 11, 15, 16]
console.log(arr.myFilter((item, index) => index % 2 == 0 && item > 8))