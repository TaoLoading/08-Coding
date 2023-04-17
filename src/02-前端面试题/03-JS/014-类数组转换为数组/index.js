/**
 * 1. 类数组定义：类数组是一种按照索引存储数据且具有 length 属性的对象，也称为伪数组或 arrayLike
 * 2. 与数组的区别：没有数组对象的所有方法
 */

// 获得一个类数组
function foo() {
  console.log('类数组：', arguments)
  console.log('真数组：', toArr4(arguments))
}
foo(1, 2, 3)

// 将类数组转换为真数组
// 方法 1：使用 Array.from()
function toArr1(arrayLike) {
  return Array.from(arrayLike)
}

// 方法 2：使用 Array.prototype.slice.call()
function toArr2(arrayLike) {
  return Array.prototype.slice.call(arrayLike)
}

// 方法 3：使用扩展运算符
function toArr3(arrayLike) {
  return [...arrayLike]
}