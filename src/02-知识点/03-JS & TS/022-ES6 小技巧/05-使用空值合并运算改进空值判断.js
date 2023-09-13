/**
 * 使用空值合并运算改进空值判断
 * 
 * 空值合并运算符 ?? 
 * 作用：当值为 null 或者是 undefined 时，返回空值合并运算符右侧的值
 * 补充：空值合并运算符不会对 0、''、false 进行处理，可使用逻辑或运算符对 0、''、false 进行处理
 */

const value = ''
// 改进前：
if (value !== null && value !== undefined && value !== '') {
  //...
}
// 或者
if (value != null && value !== '') { // null 和 undefined 隐式转换成立
  //...
}

// 改进后：
if ((value ?? '') !== '') {
  //...
}

// 其他情况
// 其他应用
const a = null
const b = undefined
const c = 0
console.log(a ?? 'default') // 'default'
console.log(b ?? 'default') // 'default'
console.log(c ?? 'default') // 0
console.log(c || 'default') // 'default'
