/**
 * 区别：
 * 1. call(obj)/apply(obj): 调用函数，指定函数中的 this 为第一个参数的值
 * 2. bind(obj): 返回一个新的函数，新函数内部会调用原来的函数，且 this 为 bind() 指定的第一参数的值
 * 3. call() 的性能比 apply() 好一些，尤其是传参大于 3 个时
 * 4. 当obj为null/undefined时, this 为 window
 * 
 * 
 * 应用：
 * 1. call()/bind() 应用：根据伪数组生成真数组
 * 2. bind(): react 中组件的自定义方法 / vue 中的事件回调函数内部
 * 
 * 
 * 自定义 call()/apply()：
 * 1. 给 obj 添加一个临时方法，方法名任意，值为当前函数
 * 2. 通过 obj 调用这个临时方法，并将接收的参数传入
 * 3. 删除 obj 上的这个临时方法属性
 * 
 * 
 * 自定义 bind()：
 * 1. 返回一个新函数
 * 2. 在新函数内部通过原函数对象的 call 方法来执行原函数
 * 3. 指定 this 为 obj
 * 4. 指定参数为 bind 调用的参数和后面新函数调用的参数
 */


// 手写 call
Function.prototype.call = function (obj, ...args) {
  // 1. 处理 obj 是 undefined 或 null 的情况
  if (obj == undefined || obj == null) {
    // obj 为 undefined 或 null 时，this 变为 window
    obj = window
  }
  // 2. 给函数添加一个方法。this 就是调用的方法
  obj.temFn = this
  // 3. 调用添加的方法，传入 args 参数，得到返回的值
  const result = obj.temFn(...args)
  // 4. 删除添加的方法
  delete obj.temFn
  // 5. 返回方法返回的值
  return result
}

// 手写 apply
Function.prototype.apply = function (obj, args) {
  // 1. 处理 obj 是 undefined 或 null 的情况
  if (obj == undefined || obj == null) {
    // obj 为 undefined 或 null 时，this 变为 window
    obj = window
  }
  // 2. 给函数添加一个方法。this 就是调用的方法
  obj.temFn = this
  // 3. 调用添加的方法，传入 args 参数，得到返回的值
  const result = obj.temFn(...args)
  // 4. 删除添加的方法
  delete obj.temFn
  // 5. 返回方法返回的值
  return result
}

// 手写 bind
Function.prototype.bind = function (obj, ...args) {
  // 1. 返回一个新函数
  return (...args2) => {
    // 2. 新函数内部调用原来的函数，指定 this 为 obj，参数列表由 args 和 args2 组成
    return this.call(obj, ...args, ...args2)
  }
}


// 测试
function fn(a, b) {
  window.xxx = 3
  console.log(a, b, this, arguments.length)
  return a + b
}
fn(1, 2)
const obj = { m: 0 }
fn.call(obj, 10, 20) // 相当于执行了 obj.fn()。10 20 obj 2
fn.apply(obj, [1, 2]) // 1 2 obj 2
fn.call(null, 1, 2) // 1 2 window 2
fn.bind(obj)(3, 4) // 3, 4 obj 2
fn.bind(obj, 5)(3, 4) // 5 3 obj 3
fn.bind(obj, 5, 6)(3, 4) // 5 6 obj 4