function myKeys(obj) {
  const keys = []
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) { // 确保 key 是来自于 obj 而非其原型链
      keys.push(key)
    }
  }
  return keys
}

// 测试
const obj = {
  a: 1,
  b: '2',
  c: {
    d: 3
  }
}
console.log(Object.keys(obj))
console.log(myKeys(obj))
