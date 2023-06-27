/**
 * 1. 作用域
 *    1. var 声明的变量作用域是函数作用域或全局作用域
 *    2. let 和 const 声明的变量作用域是块级作用域
 * 2. 变量提示
 *    1. var 声明的变量会被提升到函数作用域或全局作用域的顶部，可以在声明之前访问变量
 *    2. let 和 const 声明的变量不会被提升，如果在声明之前访问变量，会抛出 ReferenceError 异常（暂时性死区）
 * 3. 重复声明
 *    1. var 可以重复声明同一个变量
 *    2. let 和 const 不允许重复声明同一个变量
 * 4. 复制和修改
 *    1. var 和 let 声明的变量可以被重新赋值和修改
 *    2. const 声明的变量不能被重新赋值和修改。但当变量值是一个对象/数组时，可以修改对象的属性或数组的元素
 */

/* function foo() {
  var a = 1
  let b = 2
  const c = 3
  if (true) {
    var a = 4 // 全局作用域的变量 a 被重新赋值
    let b = 5 // 块级作用域的变量 b 覆盖了外层的变量 b
    const c = 6 // 块级作用域的变量 c 覆盖了外层的变量 c
    console.log(a, b, c) // 4, 5, 6
  }
  console.log(a, b, c) // 4, 2, 3
}
foo() */

// 报错：Uncaught ReferenceError: Cannot access 'a' before initialization
/* console.log('a', a)
const a = 1 */

// 报错：Uncaught TypeError: Assignment to constant variable.
/* const b = [1]
b = [2]
console.log('b', b) */

// 报错：Uncaught TypeError: Assignment to constant variable.
/* const c = { aaa: 1 }
c = { aaa: 2 }
console.log('c', c) */

/* const d = { aaa: 1 }
d.aaa = 2
console.log('d', d) // { aaa: 2 } */

const e = [1]
e[0] = 2
console.log('e', e) // [2]
