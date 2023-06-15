/**
 * 题目：使 (a == 1 && a == 2 && a ==3) 返回 true
 */

/**
 * 方法一：类型转换 (对象)
 * 原理：利用 Symbol.toPrimitive。Symbol.toPrimitive 是一个内置的 Symbol 值，作为对象的函数值属性存在，当一个对象转换为对应的原始值时，会调用此函数
 * 讲解：在此方法中，每对对象 a 进行一次类型转换，即调用一次 Symbol.toPrimitive，从而分别得到 a=1, a=2, a=3。同理可使用 valueOf 得到对象的原始值
 */
/* const a = {
  i: 1,
  // [Symbol.toPrimitive]() {
  //   return this.i++
  // },
  valueOf() {
    return this.i++
  }
} */

/**
 * 方法二：类型转换 (数组)
 * 原理：利用 toString() 将数组强制转换为字符串，每次对比时即会调用 a.toString()，从而每次对其进行自加 1
 */
let a = [0]
a.toString = () => {
  return ++a[0]
}

/**
 * 方法三：数据劫持 (Object.defineProperty)
 * 原理：劫持 window 对象，每读取一次 a 的属性，即让 a 自加 1
 */
/* let _a = 1
Object.defineProperty(window, 'a', {
  get() {
    return _a++
  }
}) */

/**
 * 方法四：数据劫持 (Proxy)
 * 原理：同理 Object.defineProperty
 */
/* let a = new Proxy({ i: 1 }, {
  get(target) {
    return () => target.i++
  }
}) */


if (a == 1 && a == 2 && a == 3) {
  console.log('该等式通过')
} else {
  console.log('该等式不通过')
}
