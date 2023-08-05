# 逻辑或和逻辑与的返回值

## 返回值与操作值有关

1. 逻辑或 `||` 返回第一个被计算为真值的操作数，如果所有操作数都被计算为假值，则返回最后一个操作数

2. 逻辑与 `&&` 返回第一个被计算为假值的操作数，如果所有操作数都被计算为真值，则返回最后一个操作数

## 对布尔值的运算

```js
console.log(true || false) // 输出：true
console.log(false || true) // 输出：true
console.log(true || true) // 输出：true
console.log(false || false) // 输出：false

console.log(true && false) // 输出：false
console.log(false && true) // 输出：false
console.log(true && true) // 输出：true
console.log(false && false) // 输出：false
```

## 对其他值的运算

```js
console.log('hello' || 'world') // 输出：'hello'
console.log('' || 'world') // 输出：'world'
console.log(0 || 42) // 输出：42
console.log(null || 'value') // 输出：'value'
console.log(undefined || 'value') // 输出：'value'

console.log('hello' && 'world') // 输出：'world'
console.log('' && 'world') // 输出：''
console.log(0 && 42) // 输出：0
console.log(null && 'value') // 输出：null
console.log(undefined && 'value') // 输出：undefined
```

## 注意

`||` 和 `&&` 是短路操作符，这意味着如果第一个操作数已经确定了整个表达式的结果，就不会再计算第二个操作数
