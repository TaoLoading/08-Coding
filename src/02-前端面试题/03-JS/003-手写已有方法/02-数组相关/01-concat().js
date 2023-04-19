/**
 * concat()
 * 作用：将 n 个数组或值与当前数组合并生成一个新数组。该方法不会改变原数组
 * 
 * @param  {...Array} values 
 */
Array.prototype.myConcat = function (...values) {
  const newArr = [...arr]
  values.forEach(value => {
    if (Array.isArray(value)) {
      newArr.push(...value)
    } else {
      newArr.push(value)
    }
  })
  return newArr
}

// 测试
const arr = [1, 2, 3]
const newArr1 = arr.myConcat([4, 5])
console.log('newArr1', newArr1)
const newArr2 = arr.myConcat(6)
console.log('newArr2', newArr2)