/**
 * flatten()
 * 功能：取出嵌套数组中的所有元素放到新数组中，实现数组的扁平化
 * 手写思路：当数组中有元素是数组时，就使用 concat() 进行数组的扁平化，直至所有元素都不是数组，完成扁平化
 */

// 方法一：递归 + reduce()
const flatten1 = (arr, deep = 1) => {
  if (deep <= 0) return arr;
  return arr.reduce((res, curr) => res.concat(Array.isArray(curr) ? flatten1(curr, deep - 1) : curr), [])
}

// 方法二：... + some() + concat()
const flatten2 = (arr) => {
  // 判断 item 是否为数组
  while (arr.some(item => Array.isArray(item))) {
    // 通过 concat() 达到去除一层数组的效果
    arr = [].concat(...arr)
  }
  return arr
}


// 测试
const arr = [1, [2, [3, 4, [5, 6]]]]
console.log(flatten1(arr, 3))
console.log(flatten2(arr))