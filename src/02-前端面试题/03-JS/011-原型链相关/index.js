/**
 * 1. 原型链的概念：
 *    1. 每个构造函数都有一个 prototype 指向它的原型对象，相对于该构造函数称为其显式原型对象
 *    2. 每个实例对象都有一个 __proto__ 指向它的原型对象，相对于该实例对象称为其隐式原型对象
 *    3. 构造函数的显式原型（prototype） === 实例对象的隐式原型（__proto__）
 *    4. 当查找某一对象中的属性时，先查其本身，没有则沿着其 __proto__ 向上查找，查找属性的这条链就叫原型链
 */

/**
 * 2. 构造函数创建实例对象时，new 操作符都做了什么：
 *    1. 创建一个空实例对象
 *    2. 将实例对象和构造函数通过原型链进行连接
 *    3. 修改构造函数的 this 指向到实例对象
 *    4. 返回新创建的实例对象
 */

/**
 * 3. instanceof：
 *    1. 表达式：A instanceof B
 *    2. 原理：判断 B 函数的显式原型对象是否在 A 对象的原型链上，存在返回 true, 否则返回 false
 */
function Foo() { }
var f1 = new Foo()
console.log(f1 instanceof Foo) // true
console.log(f1 instanceof Object) // true

/**
 * 4. for...in
 * for...in 会遍历对象的自身属性和其原型链上的属性，故其速度较慢
 */

/**
 * 5. hasOwnProperty 和 in
 * hasOwnProperty：判断一个对象是否包含自定义属性而不是原型链上的属性，是 JavaScript 中唯一一个处理属性但是不查找原型链的函数
 * in：判断一个对象是否包含自定义属性，会查找原型链上的属性
 */