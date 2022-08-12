/**
 * 实例对象A instanceof 构造函数B：检测构造函数B的prototype属性是否出现在实例对象A的原型链上
 */

const _instanceof = function (A, B) {
  let p = A
  while (p) {
    if (p === B.prototype) return true
    p = p.__proto__
  }
  return false
}