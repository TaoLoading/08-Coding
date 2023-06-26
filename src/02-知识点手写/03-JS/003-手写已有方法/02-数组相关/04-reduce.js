/**
 * reduce()
 * 作用：对数组内的元素依次执行回调函数，返回汇总结果。该方法不会改变原数组
 * 注意：回调函数中传参依次为：acc（汇总值）, cur（当前值）, index（下标，可不传）
 * 
 * @param {Function} callback 
 * @param {any} initValue 初始值，可不传
 */
Array.prototype.myReduce = function (callback, initValue) {
  let acc = initValue
  this.forEach(item => {
    acc = callback(acc, item)
  })
  return acc
}

// 测试
const arr = [1, 3, 6, 9, 11, 15, 16]
console.log(arr.myReduce((total, item) => {
  return total + (item % 2 == 1 ? item : 0)
}, 0))
