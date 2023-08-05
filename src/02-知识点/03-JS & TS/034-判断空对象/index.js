// 方法一：Object.keys() 判断对象键的数组长度
const isNullObj1 = (obj) => {
  return Object.keys(obj).length === 0
}

// 方法二：JSON.stringify() 判断对象的长度
const isNullObj2 = (obj) => {
  return JSON.stringify(obj) === '{}'
}

/**
 * 测试
 */
const obj1 = {}
const obj2 = {
  a: 1,
  b: 2
}
console.log('isNullObj1', isNullObj1(obj1))
console.log('isNullObj1', isNullObj1(obj2))
console.log('isNullObj2', isNullObj2(obj1))
console.log('isNullObj2', isNullObj2(obj2))
