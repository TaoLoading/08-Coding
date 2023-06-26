/**
 * 解构赋值
 * 1. 技巧 1：使用解构赋值取值
 * 2. 技巧 2：处理需要的变量名不同的情况
 * 注：解构的对象不能为 undefined、null，故要给被解构的对象一个默认值
 */

const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
}

// 使用解构赋值取值
const { a, b, c, d, e } = obj || {}
const f = a + d
console.log('f', f)

// 处理需要的变量名不同的情况
const { a: a1 } = obj
console.log('a1', a1)

