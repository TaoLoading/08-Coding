/**
 * 原型链的概念：
 * 1. 每个构造函数都有一个 prototype 指向它的原型对象，相对于该构造函数称为其显式原型对象
 * 2. 每个实例对象都有一个 __proto__ 指向它的原型对象，相对于该实例对象称为其隐式原型对象
 * 3. 构造函数的显式原型（prototype） === 实例对象的隐式原型（__proto__）
 * 4. 当查找某一对象中的属性时，先查其本身，没有则沿着其 __proto__ 向上查找，查找属性的这条链就叫原型链
 * 
 * 
 * constructor
 * 每个对象都有一个 constructor 属性，它指向创建该对象的构造函数
 * 
 * 
 * hasOwnProperty 和 in
 * 1. hasOwnProperty：判断一个对象自身是否包含某个属性而不是原型链上的属性，是 JavaScript 中唯一一个处理属性但是不查找原型链的函数
 *    person.hasOwnProperty('name')
 * 2. in：判断一个对象是否包含某个属性，会查找原型链上的属性
 *    'name' in person
 * 
 * 原型链的终点
 * Object.prototype.__proto__=== null 成立，故原型链的终点是 null
 */
