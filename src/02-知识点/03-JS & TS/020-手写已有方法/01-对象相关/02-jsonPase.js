function jsonParse(json) {
  return eval('(' + json + ')') // 加括号是为了防止 json 中含有 js 表达式或语句在解析式发生错误
}

// 测试
const jsonObj = JSON.stringify({ a: '1', b: 2 })
console.log('jsonObj', jsonObj)
const obj = jsonParse(jsonObj)
console.log('obj', obj)
