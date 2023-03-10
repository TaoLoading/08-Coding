/**
 * 转换方法：将被转换数不断对 2 取余，最终将余数倒数排列
 *
 * 因为需要将余数倒序排列，而栈结构是先进后出，故使用栈
 */

function Stack() {
  const arr = []
  this.push = function (params) {
    arr.push(params)
  }
  this.pop = function () {
    return arr.pop()
  }
  this.peek = function () {
    return arr[arr.length - 1]
  }
  this.size = function () {
    return arr.length
  }
  this.isEmpty = function () {
    return arr.length === 0
  }
}

function dec2bin(decNum) {
  const stack = new Stack
  // 对 2 不断取余，并将余数保存到 stack 中
  while (decNum > 0) {
    const remainder = decNum % 2
    stack.push(remainder)
    decNum = Math.floor(decNum / 2)
  }
  let result = ''
  // 依次去除 stack 中的元素
  while (!stack.isEmpty()) {
    console.log(stack.pop())
  }
  return result
}

dec2bin(1011)