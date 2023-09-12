/**
 * 方法 1：JSON 转化
 * 缺点：1.函数属性丢失   2.抛弃对象的 constructor，将对象的构造函数变为 Object，存在循环引用时出错
 */
const deepClone1 = (target) => {
  return JSON.parse(JSON.stringify(target))
}

/**
 * 方法 2：浅拷贝 + 递归
 * 思路：获取源数组中的元素向新数组中依次添加
 * 缺点：1.函数属性丢失   2.抛弃对象的 constructor，将对象的构造函数变为 Object，存在循环引用时出错
 */
const deepClone2 = (target) => {
  if (target instanceof Array || (target !== null && typeof target === 'object')) {
    // 创建拷贝对象
    const cloneTarget = target instanceof Array ? [] : {}
    for (const key in target) {
      if (target.hasOwnProperty(key)) { // hasOwnProperty 是为了保证 key 是来自 target 而不是 target 的原型对象
        // 通过对属性值进行递归拷贝，实现深拷贝
        cloneTarget[key] = deepClone2(target[key])
      }
    }
    return cloneTarget
  } else {
    return target
  }
}

/**
 * 方法 3：map 容器 + 递归
 * 思路：对同一个对象/数组只拷贝一次。如果已经拷贝，则直接返回；如果没有拷贝，则保存到拷贝对象中
 * 缓存容器的结构：Map，key: target，value: cloneTarget
 */
const deepClone3 = (target, map = new Map()) => {
  // 1.如果是数组或对象，则进行下一步拷贝操作，其他则直接返回值
  if (target instanceof Array || (target !== null && typeof target === 'object')) {
    // 2.判断是否进行已经进行了拷贝，如果已经拷贝则直接返回值
    let cloneTarget = map.get(target)
    if (cloneTarget) {
      return cloneTarget
    }
    // 3.如果不存在，则创建拷贝对象，并将要拷贝的值保存到 map 容器
    cloneTarget = target instanceof Array ? [] : {}
    map.set(target, cloneTarget)
    // 4.遍历源对象进行拷贝
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        // 通过对属性值进行递归拷贝，实现深拷贝
        cloneTarget[key] = deepClone3(target[key], map)
      }
    }
    return cloneTarget
  } else {
    return target
  }
}

/**
 * 方法 3 优化版：map 容器 + 递归
 * 思路：优化数组遍历效率。因为 forEach() 遍历效率更高
 */
const deepClone4 = (target, map = new Map()) => {
  // 1.如果是数组或对象，则进行下一步拷贝操作，其他则直接返回值
  if (target instanceof Array || (target !== null && typeof target === 'object')) {
    // 2.判断是否进行已经进行了拷贝，如果已经拷贝则直接返回值
    let cloneTarget = map.get(target)
    if (cloneTarget) {
      return cloneTarget
    }
    // 3.如果不存在，则根据值类型分别创建拷贝对象
    if (target instanceof Array) {
      cloneTarget = []
      // 4.将要拷贝的值保存到 map 容器
      map.set(target, cloneTarget)
      // 5.如果值类型是数组则遍历源数组进行拷贝
      target.forEach((item, index) => {
        // 通过对属性值进行递归拷贝，实现深拷贝
        cloneTarget[index] = deepClone4(item, map)
      })
    } else {
      cloneTarget = {}
      // 4.将要拷贝的值保存到 map 容器
      map.set(target, cloneTarget)
      // 5.如果值类型是对象则遍历源对象进行拷贝
      for (const key in target) {
        if (target.hasOwnProperty(key)) {
          // 通过对属性值进行递归拷贝，实现深拷贝
          cloneTarget[key] = deepClone4(target[key], map)
        }
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
    },
    z: 1
  },
  d: function () { }
}

// 测试定义的深拷贝方法
const obj2 = deepClone4(obj1)
obj2.c.z = 2
console.log('obj1', obj1.c.z) // 1
console.log('obj2', obj2.c.z) // 2
