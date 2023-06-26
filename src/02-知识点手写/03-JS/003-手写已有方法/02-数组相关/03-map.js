/**
 * map()
 * 作用：将数组中的每个元素经过回调函数执行，将执行后的值依次放入新数组后返回。该方法不会改变原数组
 * 注意：回调函数中传参依次为：item（元素）, index（下标，可不传）
 * 
 * @param {Function} callback 
 */
Array.prototype.myMap = function (callback) {
  const newArr = []
  this.forEach(item => {
    const res = callback(item)
    newArr.push(res)
  })
  return newArr
}

// 测试
const arr = [1, 3, 6, 9, 15, 19, 16]
console.log(arr.map((item) => item + 10))
