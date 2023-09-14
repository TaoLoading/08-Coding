/**
 * ES6 中的暂时性死区（Temporal Dead Zone，简称 TDZ）指的是在代码块内使用 let 或 const 声明变量时，
 * 该变量在声明之前是不可访问的。在代码块内，从变量使用的位置到变量声明的位置之间的这段区域就是 TDZ
 *
 * 暂时性死区的出现是为了解决变量提升所带来的问题
 */

// 报错：Uncaught ReferenceError: Cannot access 'a' before initialization
console.log('a', a)
const a = 1
