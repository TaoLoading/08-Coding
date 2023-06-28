/**
 * 在 JavaScript 中，NaN 是一个特殊的数值，表示不是一个数字
 * NaN 本身是一个不确定的值，它与任何其他值（包括 NaN 本身）进行比较都会返回 false
 * 可以使用 isNaN()、Number.isNaN() 判断是不是 NaN
 */

console.log(typeof NaN) // number
console.log(NaN === NaN) // false
console.log(isNaN(NaN)) // true
console.log(Number.isNaN(NaN)) // true
