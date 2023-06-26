/**
 * 拼接运算符中支持逻辑运算
 */

/* const name = '小明'
const score = 59
let result = ''
if (score > 60) {
  result = `${name}的考试成绩及格`
} else {
  result = `${name}的考试成绩不及格`
} */

const name = '小明'
const score = 59
const result = `${name}的考试成绩${score > 60 ? '' : '不'}及格`
console.log('result', result)
