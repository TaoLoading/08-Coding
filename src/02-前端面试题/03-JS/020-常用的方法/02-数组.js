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
 * 作用：查询数组中元素第一次出现的位置，有则返回第一次出现的下标，无则返回 -1
 * 参数：第二个参数是起始位置
 * 备注：不会改变原数组
 */
/* console.log(arr.indexOf('1', 2))
console.log(arr) */

/**
 * slice()
 * 作用：截取数组
 * 参数：1. 第一个参数为起始位置，第二个参数为结束位置
 *       2. 当第二个参数大于第一个参数时，会返回一个空数组
 *       3. 当只传入一个参数时，是截取起始到最后的位置
 *       4. 当传入负数时，表示从后倒数截取。如如果传入 -3，则表示倒数第三个元素
 * 备注：不会改变原数组
 */
/* console.log(arr.slice(2, 4))
console.log(arr.slice(-3))
console.log(arr) */

/**
 * splice()
 * 作用：向数组中添加或删除元素，返回被删除的元素
 * 参数：1. 接收三个参数
 *       2. 第一个参数是要操作的起始位置（包括该位置）
 *       3. 第二个参数是要删除的元素个数
 *       4. 第三个参数是要添加到数组中的元素
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
 * 作用：以传入的规则函数进行排序，默认是按元素从小到大排序
 * 参数：规则函数。为空时从小到大排序
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
 * 作用：在数组末尾删除一个元素，返回删除的元素
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
 * unshift()
 * 作用：在数组头部删除一个元素，返回删除的元素
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
 * 作用：查找数组中第一个满足条件的元素
 * 备注：不会改变原数组
 */
/* console.log(arr.find(function (item, index) {
  return item > 10
}))
console.log(arr)  */

/**
 * findIndex()
 * 作用：查找数组中第一个满足条件的元素的下标
 * 备注：不会改变原数组
 */
console.log(arr.findIndex(function (item, index) {
  return item > 10
}))
console.log(arr) 
