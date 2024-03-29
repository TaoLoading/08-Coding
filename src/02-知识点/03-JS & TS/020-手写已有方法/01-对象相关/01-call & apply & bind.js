/**
 * 1. 区别
 * call 与 apply 相同点：
 *    1. 第一个参数都是指定的 this 指向
 *    2. 立即执行函数
 * call 与 apply 不同点：
 *    1. call 其他参数是依次传入
 *    2. apply 其他参数是以数组的形式直接传入
 * bind 与二者的区别：
 *    1. 会返回一个新函数
 *    2. 不会立即执行返回的新函数
 *    3. 传参形式是再次执行返回的新函数，并在新函数中传入参数
 * 
 * 
 * 2. 应用
 *    1. call()/bind() 应用：根据伪数组生成真数组
 *    2. bind(): react 中组件的自定义方法 / vue 中的事件回调函数内部
 * 
 * 
 * 3. call()/apply() 的实现思路
 *    1. 给 obj 添加一个临时方法，方法名任意，值为当前函数
 *    2. 通过 obj 调用这个临时方法，并将接收的参数传入
 *    3. 删除 obj 上的这个临时方法属性
 * 
 * 
 * 4. bind() 的实现思路
 *    1. 返回一个新函数
 *    2. 在新函数内部通过原函数对象的 call 方法来执行原函数
 *    3. 指定 this 为 obj
 *    4. 指定参数为 bind 调用的参数和后面新函数调用的参数
 */

// call
Function.prototype.myCall = function (obj, ...args) {
  // 1.处理 obj 是 undefined 或 null 的情况
  if (obj == null) {
    obj = window
  }
  // 2.给函数添加一个方法。此处的 this 是调用的方法
  obj.tempFn = this
  // 3.调用添加的方法，传入 args 参数，得到返回的值
  const result = obj.tempFn(...args)
  // 4.删除添加的方法
  delete obj.tempFn
  // 5.返回方法返回的值
  return result
}

// apply
Function.prototype.myApply = function (obj, args) {
  // 1.处理 obj 是 undefined 或 null 的情况
  if (obj == null) {
    obj = window
  }
  // 2.给函数添加一个方法。此处的 this 是调用的方法
  obj.tempFn = this
  // 3.调用添加的方法，传入 args 参数，得到返回的值
  const result = obj.tempFn(...args)
  // 4.删除添加的方法
  delete obj.tempFn
  // 5.返回方法返回的值
  return result
}

// 手写 bind
Function.prototype.myBind = function (obj, ...args) {
  // 1.处理 obj 是 undefined 或 null 的情况
  if (obj == null) {
    obj = window
  }
  // 2.返回一个新函数
  return (...args2) => { // args2 是后续调用时传入的新参数
    // 3.新函数内部调用原来的函数，指定 this 为 obj，参数列表由 args 和 args2 组成
    return this.call(obj, ...args, ...args2)
  }
}

// 测试
function fn(a, b) {
  console.log(a, b, this, arguments.length)
  return a + b
}
const obj = { m: 0 }
// fn.myCall(obj, 10, 20) // 10 20 obj 2
// fn.myApply(obj, [1, 2]) // 1 2 obj 2
// fn.myCall(null, 1, 2) // 1 2 window 2
fn.myBind(null, 3, 4)() // 3, 4 window 2
fn.myBind(obj, 3, 4)() // 3, 4 obj 2
fn.myBind(obj)(3, 4) // 3, 4 obj 2
fn.myBind(obj, 5)(3, 4) // 5 3 obj 3
fn.myBind(obj, 5, 6)(3, 4) // 5 6 obj 4
