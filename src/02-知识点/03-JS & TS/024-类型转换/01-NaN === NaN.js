/**
 * 在 JavaScript 中，NaN 是一个特殊的值，表示不是一个数字
 * NaN 本身是一个不确定的值，它与任何其他值（包括 NaN 本身）进行比较都会返回 false
 * 可以使用 isNaN()、Number.isNaN() 判断是不是 NaN
 *
 * 补充：isNaN() 和 Number.isNaN() 的区别
 * 1. isNaN() 接收参数后，会尝试将这个参数转换为数字，任何不能被转换为数字的的值都会返回 true
 * 2. Number.isNaN() 接收参数后，会尝试将这个参数转换为数字，如果是数字再继续判断是否为 NaN，只有当传入的是数字并且是 NaN 时才会返回 true
 */

console.log(typeof NaN) // number
console.log(NaN === NaN) // false
console.log(isNaN(NaN)) // true
console.log(Number.isNaN(NaN)) // true
console.log(isNaN('hello')) // true
console.log(Number.isNaN('hello')) // false
