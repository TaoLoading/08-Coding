let arr = [2, 13, 3, 66, '1', 'aaa', 5]

/**
 * concat()
 * 作用：拼接数组
 * 备注：不会改变原数组
 */
/* console.log(arr.concat([4, 5, 6, 7]))
console.log(arr) */

/**
 * join()
 * 作用：以传入的字符连接数组
 * 参数：传入空则以逗号进行连接
 * 备注：不会改变原数组
 */
/* console.log(arr.join('*'))
console.log(arr.join())
console.log(arr) */

/**
 * indexOf()
 * 作用：查询数组中元素第 1 次出现的位置，有则返回第 1 次出现的下标，无则返回 -1
 * 参数：第 2 个参数是起始坐标
 * 备注：不会改变原数组
 */
/* console.log(arr.indexOf('1', 2))
console.log(arr) */

/**
 * slice()
 * 作用：截取数组
 * 参数：1. 第 1 个参数为起始坐标，第 2 个参数为终止坐标
 *       2. 当第 2 个参数大于第 1 个参数时，会返回 1 个空数组
 *       3. 当只传入 1 个参数时，是截取起始到最后的位置
 *       4. 当传入负数时，表示从后倒数截取。如如果传入 -3，则表示倒数第 3 个元素
 * 备注：不会改变原数组
 */
/* console.log(arr.slice(2, 4))
console.log(arr.slice(-3))
console.log(arr) */

/**
 * splice()
 * 作用：向数组中添加或删除元素，返回被删除的元素
 * 参数：1. 接收 3 个参数
 *       2. 第 1 个参数是要操作的起始坐标（包括该位置）
 *       3. 第 2 个参数是要删除的元素个数
 *       4. 第 3 个参数是要添加到数组中的元素
 * 备注：会改变原数组
 */
// console.log(arr)
// console.log(arr.splice(1, 3))
// console.log(arr)
// console.log(arr.splice(1, 0, 'zly', 'ym'))
// console.log(arr)
// console.log(arr.splice(1, 2, 'rb', 'ty'))
// console.log(arr)

/**
 * sort()
 * 作用：以传入的回调函数进行排序，默认是按元素从小到大排序
 * 参数：回调函数。为空时从小到大排序
 * 备注：会改变原数组
 */
/* console.log(arr.sort(function (a, b) {
  return a - b
}))
console.log(arr) */

/**
 * push()
 * 作用：在数组末尾添加元素，返回添加后数组的长度
 * 备注：会改变原数组
 */
/* console.log(arr.push('bbb'))
console.log(arr) */

/**
 * pop()
 * 作用：在数组末尾删除 1 个元素，返回删除的元素
 * 备注：会改变原数组
 */
/* console.log(arr.pop())
console.log(arr) */

/**
 * unshift()
 * 作用：在数组头部添加元素，返回添加后数组的长度
 * 备注：会改变原数组
 */
/* console.log(arr.unshift(1, 2))
console.log(arr) */

/**
 * shift()
 * 作用：在数组头部删除 1 个元素，返回删除的元素
 * 备注：会改变原数组
 */
/* console.log(arr.shift())
console.log(arr) */

/**
 * map()
 * 作用：对数组进行加工，返回新数组
 * 备注：不会改变原数组
 */
/* console.log(arr.map(function (item, index) {
  return item * 2
}))
console.log(arr) */

/**
 * reduce()
 * 作用：对数组中的所有元素进行累加计算，并返回计算结果
 * 参数：1. 接收 2 个参数。第 1 个参数是回调函数，第 2 个参数是初始值
 *       2. 回调函数接收 4 个参数
 *       3. 回调函数的参数分别为：accumulator（汇总值）, currentValue（当前值）, currentIndex（下标），array（数组本身）
 * 备注：不会改变原数组
 */
/* console.log(arr.reduce(function (accumulator, currentValue, currentIndex, array) {
  console.log('currentIndex', currentIndex)
  return accumulator + currentValue
}, 0))
console.log(arr) */

/**
 * filter()
 * 作用：对数组进行筛选，返回由合格元素组成的新数组
 * 备注：不会改变原数组
 */
/* console.log(arr.filter(function (item, index) {
  return item >= 2
}))
console.log(arr) */

/**
 * find()
 * 作用：查找数组中第 1 个满足条件的元素
 * 备注：不会改变原数组
 */
/* console.log(arr.find(function (item, index) {
  return item > 10
}))
console.log(arr)  */

/**
 * includes()
 * 作用：查找数组中是否包含某个元素
 * 备注：不会改变原数组
 */
console.log(arr.includes('1'))
console.log(arr)

/**
 * findIndex()
 * 作用：查找数组中第 1 个满足条件的元素的下标
 * 备注：不会改变原数组
 */
/* console.log(arr.findIndex(function (item, index) {
  return item > 10
}))
console.log(arr)  */
