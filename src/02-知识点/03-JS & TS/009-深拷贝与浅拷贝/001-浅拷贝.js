/**
 * 常见的浅拷贝操作：
 * 1. 直接赋值
 * 2. 扩展运算符
 * 3. Object.assign()
 * 4. 数组.slice()
 * 5. Array.from()。作用：从可迭代或类数组对象创建一个新的浅拷贝的数组
 */

const shallowClone1 = target => {
  if (target instanceof Array) {
    // 拷贝目标为数组
    return [...target]
  } else if (target !== null && typeof target === 'object') {
    // 拷贝目标为对象且不为 null
    return { ...target }
  } else {
    // 拷贝目标为其他
    return target
  }
}

const shallowClone2 = target => {
  if (target instanceof Array || (target !== null && typeof target === 'object')) {
    const cloneTarget = target instanceof Array ? [] : {}
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        // hasOwnProperty 是为了保证 key 是来自 target 而不是 target 的原型对象
        cloneTarget[key] = target[key]
      }
    }
    return cloneTarget
  } else {
    return target
  }
}

// 测试
const obj1 = {
  a: 1,
  b: ['1', '2', '3'],
  c: {
    x: {
      y: 2
    },
    z: 1
  },
  d: function () {}
}
const obj2 = shallowClone1(obj1)
obj2.c.z = 2
console.log('obj1', obj1.c.z) // 2
console.log('obj2', obj2.c.z) // 2
