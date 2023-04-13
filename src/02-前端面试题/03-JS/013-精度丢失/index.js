/**
 * 原因：
 * js 采用 IEEE 754 标准中的双精度浮点数表示数字，而计算机使用的是有限的 64 位的二进制，
 * 这就导致了在转换时会出现精度丢失的问题
 * 
 * 解决办法
 * 1. 先将浮点数转换为整数，再转换为小数
 * 2. 使用高精度库，如 Big.js 或 Decimal.js
 * 3. 使用 toFixed() 方法将浮点数转换为字符串，并指定小数位数
 */

// 方法 1
function add1(num1, num2) {
  // 定义精度为 10 位小数
  const base = Math.pow(10, 10)
  const n1 = Math.round(num1 * base)
  const n2 = Math.round(num2 * base)
  return (n1 + n2) / base
}

// 方法 3
function add2(num1, num2) {
  const sum = num1 + num2
  // 保留 10 位小数
  return Number(sum.toFixed(10))
}

console.log('0.1 + 0.2 == 0.3', 0.1 + 0.2 == 0.3)
console.log('0.1 + 0.2 == 0.3', add1(0.1, 0.2) == 0.3)
console.log('0.1 + 0.2 == 0.3', add2(0.1, 0.2) == 0.3)