function cycleDetector(obj) {
  const set = new Set() // 用于保存已遍历过的对象

  function cycle(o) {
    if (typeof o === 'object' && o !== null) {
      if (set.has(o)) {
        // 如果 set 中存在 o，则证明存在循环引用
        return true
      }
      // 不存在，将 o 放入 set 中
      set.add(o)
      // 递归遍历 o 的属性
      for (const key in o) {
        if (cycle(o[key])) {
          return true
        }
      }
    }
    return false
  }

  return cycle(obj)
}

// 测试
const obj = {
  name: 'John',
  age: 20,
  friend: {
    name: 'Tom',
    age: 22,
    friend: null
  }
}

obj.friend.friend = obj
console.log('cycleDetector', cycleDetector(obj))
