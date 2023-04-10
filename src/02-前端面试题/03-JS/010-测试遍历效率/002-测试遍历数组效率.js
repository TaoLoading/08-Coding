const arr = []
for (let i = 0; i < 100000; i++) {
  arr.push(1)
}

// for..in（会查找原型链）
console.time()
console.log('for..in')
for (const key in arr) {
  let element1 = arr[key]
}
console.timeEnd()

// for
console.time()
console.log('for')
for (let index = 0; index < arr.length; index++) {
  let element2 = arr[index]
}
console.timeEnd()

// forEach
console.time()
console.log('forEach')
arr.forEach(item => {
  let element3 = item
})
console.timeEnd()

// for..in（会查找原型链）
console.time()
console.log('for..of')
for (const item of arr) {
  let element4 = item
}
console.timeEnd()

// keys() + forEach（遍历两次）
console.time()
console.log('keys() + forEach')
Object.keys(arr).forEach(index => {
  let element5 = arr[index]
})
console.timeEnd()

// while
console.time()
console.log('while')
const length = arr.length
let index = 0
while (index++ < length) {
  let element6 = arr[index]
}
console.timeEnd()

/**
 * 效率：
 * for | while | forEach | for..of > for..in | keys() + forEach
 */