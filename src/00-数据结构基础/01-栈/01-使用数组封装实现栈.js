/**
 * JavaScript没有栈的概念，但可以使用Array实现栈的功能
 */

function Stack() {
  const arr = []

  // 压栈：push()
  this.push = function (params) {
    arr.push(params)
  }

  // 出栈：pop()
  this.pop = function () {
    return arr.pop()
  }

  // 查看栈顶：peek()
  this.peek = function () {
    return arr[arr.length - 1]
  }

  // 查看栈中元素个数：size()
  this.size = function () {
    return arr.length
  }

  // 查看是否是空栈：()
  this.isEmpty = function () {
    return arr.length === 0
  }
}

// 测试
const stack = new Stack()
stack.push('a')
stack.push('b')
stack.push('c')
stack.pop()
console.log(stack.size())
console.log(stack.peek())
console.log(stack.isEmpty())
