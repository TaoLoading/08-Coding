// 方法 1：ES6 语法
// 原理：Set 对象是一组唯一值的集合，其中每个值只能出现一次。当将一个数组传递给 Set 对象时，Set 对象会自动过滤掉其中的重复项
const unique1 = arr => {
  // return [...new Set(arr)]
  return Array.from(new Set(arr))
}

// 方法 2：filter
// 判断元素第一次出现的位置
const unique2 = arr => {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}

// 方法 3：forEach() + indexOf。双重遍历，效率低
// 判断元素是否在新数组中出现过
const unique3 = arr => {
  const newArr = []
  arr.forEach(item => {
    if (newArr.indexOf(item) == -1) {
      newArr.push(item)
    }
  })
  return newArr
}

// 方法 4：forEach() + 对象形式。单次遍历，效率稍高
const unique4 = arr => {
  const newArr = []
  // 空对象，存放第一次遍历的元素，元素为属性名，true 为属性值
  const obj = {}
  arr.forEach(item => {
    if (!obj.hasOwnProperty(item)) {
      newArr.push(item)
      obj[item] = true
    }
  })
  return newArr
}

// 测试
const arr = [1, 1, 2, 3, 4, 5, 6, 2, 33, 2, 5]
console.log(unique1(arr))
console.log(unique2(arr))
console.log(unique3(arr))
console.log(unique4(arr))
