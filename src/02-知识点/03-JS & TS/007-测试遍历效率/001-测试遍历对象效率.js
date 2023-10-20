// 测试源数据
const obj = {}
for (let i = 0; i < 100000; i++) {
  obj[i] = 'a'
}

// for..in
console.time()
console.log('for..in')
for (const key in obj) {
  // let element1 = obj[key]
}
console.timeEnd()

// keys() + forEach
console.time()
console.log('keys() + forEach')
Object.keys(obj).forEach(key => {
  // let element2 = obj[key]
})
console.timeEnd()

/**
 * 效率：相差不大
 * for...in 会遍历对象的自身属性和其原型链上的属性。而 keys() + forEach 相对多了一层操作
 */
