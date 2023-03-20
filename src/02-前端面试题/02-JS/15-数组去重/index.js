// 方法 1，利用 forEach() + indexOf。双重遍历，效率低
Array.prototype.unique1 = function (arr) {
  const newArr = []
  arr.forEach(item => {
    if (newArr.indexOf(item) == -1) {
      newArr.push(item)
    }
  })
  return newArr
}

// 方法 2，利用 forEach() + 对象形式。单次遍历，效率稍高
Array.prototype.unique2 = function (arr) {
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

// 方法 3，利用 ES6 语法
Array.prototype.unique3 = function (arr) {
  // return [...new Set(arr)]
  return Array.from(new Set(arr))
}

const arr = [1, 1, 2, 3, 4, 5, 6, 2, 33, 2, 5]
console.log(arr.unique1(arr))
console.log(arr.unique2(arr))
console.log(arr.unique3(arr))