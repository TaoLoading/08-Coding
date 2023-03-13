const shallowClone1 = (target) => {
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

const shallowClone2 = (target) => {
  if (target instanceof Array || (target !== null && typeof target === 'object')) {
    const cloneTarget = target instanceof Array ? [] : {}
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        cloneTarget[key] = target[key]
      }
    }
    return cloneTarget
  } else {
    return target
  }
}

const obj1 = {
  a: 1,
  b: ['1', '2', '3'],
  c: {
    x: {
      y: 2
    }
  },
  d: function () { }
}
const obj2 = shallowClone2(obj1)
console.log('obj2', obj2)
console.log(obj2 === obj1, obj2.a === obj1.a, obj2.b === obj1.b, obj2.c === obj1.c, obj2.d === obj1.d) // false true true true true