/**
 * 实例对象 A instanceof 构造函数 B：检测构造函数 B 的 prototype 属性是否出现在实例对象 A 的原型链上
 */

const _instanceof = function (A, B) {
  let p = A
  while (p) {
    if (p === B.prototype) return true
    p = p.__proto__
  }
  return false
}