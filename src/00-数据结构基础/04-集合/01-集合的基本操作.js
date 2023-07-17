/**
 * 在 ES6 中添加了集合这种数据结构，名为 Set
 */

// 去重
const arr = [1, 1, 2, 2, 3]
const UniqueArr = [...new Set(arr)]
console.log('去重后的数组为：', UniqueArr)

// 判断元素是否存在于集合中
const set = new Set(arr)
const result = set.has(5)
console.log('该元素是否在集合中：', result)

// 求交集。没有提供直接求交集的方法，采用过滤数组的方式代替
const set1 = new Set([2, 3])
const arr1 = [...set].filter(item => set1.has(item))
const intersectionSet = new Set(arr1)
console.log('交集是：', intersectionSet)
