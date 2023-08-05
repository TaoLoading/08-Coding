/**
 * 使用 Set 合并数组，相较 concat() 和 Object.assign()，可直接实现数组去重
 * 
 * 使用扩展运算符合并对象
 */

const a = [1, 2, 3]
const b = [1, 5, 6]

const c = [...new Set([...a, ...b])] // [1, 2, 3, 5, 6]
console.log('c', c)

const obj1 = {
  a: 1
}
const obj2 = {
  a: 2,
  b: 1
}
const obj = { ...obj1, ...obj2 } // {a: 1, b: 1}
console.log('obj', obj)
