/**
 * concat()
 * 语法：arr.concat(value1[, value2[, ...[, valueN]]])
 * 功能：将 n 个数组或值与当前数组合并生成一个新数组
 */
Array.prototype.concat = function (...values) {
  // 1.将原数组分别放入新数组中
  const newArr = [...this]
  // 2.遍历 values，获得其中的 value
  values.forEach(value => {
    if (Array.isArray(value)) {
      // 3.若 value 是数组，则将其中元素分别放入新数组中
      newArr.push(...value)
    } else {
      // 4.若 value 是元素，则直接放入新数组中
      newArr.push(value)
    }
  })
  return newArr
}

/**
 * slice()
 * 语法：arr.slice([begin[, end]])
 * 功能：返回一个由 begin 和 end 决定的原数组的浅拷贝，原始数组不会被改变
 */
Array.prototype.slice = function (begin, end) {
  // 1.创建一个新数组
  const newArr = []
  // 2.分情况处理
  // 如果原数组为空，则返回原数组
  if (this.length == 0) {
    return this
  }
  // 如果未指定起始位置，则默认为 0
  begin = begin || 0
  end = end || this.length - 1
  // 如果起始位置超过限制，则默认为最大
  if (begin < 0) {
    begin = 0
  }
  if (end > this.length - 1) {
    end = this.length - 1
  }
  for (let index = begin; index <= end; index++) {
    newArr.push(this[index])
  }
  return newArr
}

// 测试
const arr = [1, 2, 3]
console.log(arr.concat([4, 5], 6))
console.log(arr.slice(0))