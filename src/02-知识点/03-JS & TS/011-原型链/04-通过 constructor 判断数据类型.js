/**
 * 通过 constructor 判断数据类型
 * constructor 有两个作用，一是判断数据的类型，二是对象实例通过 constructor 对象访问它的构造函数
 * 
 * 注意：如果修改了对象的原型对象，则不能使用 constructor 判断数据类型
 */

// 通过 constructor 判断数据类型
/* console.log((2).constructor === Number) // true
console.log((true).constructor === Boolean) // true
console.log(('str').constructor === String) // true
console.log(([]).constructor === Array) // true
console.log((function () { }).constructor === Function) // true
console.log(({}).constructor === Object) // true */

// 修改了原型对象
function Fn() { }
Fn.prototype = new Array()
const f = new Fn()
console.log(f.constructor === Fn) // false
console.log(f.constructor === Array) // true
