function jsonParse(json) {
  return eval('(' + json + ')') // eval() 会将传入的字符串当做 JavaScript 代码进行执行
}

// 测试
const jsonObj = JSON.stringify({ a: '1', b: 2 })
const obj = jsonParse(jsonObj)
console.log('obj', obj)