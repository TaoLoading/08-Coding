function jsonParse(json) {
  return eval('(' + json + ')')
}

// 测试
const jsonObj = JSON.stringify({ a: '1', b: 2 })
const obj = jsonParse(jsonObj)
console.log('obj', obj)