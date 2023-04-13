// 方法 1：使用 flat()
function flat1(arr) {
  const newArr = arr.flat(Infinity)
  return newArr
}

// 方法 2：正则
function flat2(arr) {
  const newArr = JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']')
  return newArr
}

// 方法 3：递归 + reduce()
function flat3(arr, deep = 1) {
  if (deep <= 0) {
    return arr
  }
  return arr.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? flat3(cur, deep - 1) : cur)
  }, [])
}

// 方法 4：... + some() + concat()
function flat4(arr) {
  // 判断 item 是否为数组
  while (arr.some(item => Array.isArray(item))) {
    // 通过 concat() 达到去除一层数组的效果
    arr = [].concat(...arr)
  }
  return arr
}

// 测试
const arr = [1, [2, [3, [4, 5, '6']]], 6]
console.log(flat1(arr))
console.log(flat2(arr))
console.log(flat3(arr, 3))
console.log(flat4(arr))