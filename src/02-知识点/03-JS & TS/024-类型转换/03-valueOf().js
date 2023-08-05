/**
 * valueOf() 用于返回对象的原始值
 * 1. 大多数内置对象（如数字对象、日期对象等）都实现了 valueOf() 方法
 * 2. 若对字符串使用，则 JavaScript 引擎会自动调用字符串对象的 toString()
 */

const obj = {
  value: 42,
  valueOf() {
    return this.value
  }
}
console.log(obj.valueOf()) // 42

const str = 'Hello World'
console.log(str.valueOf()) // Hello World
