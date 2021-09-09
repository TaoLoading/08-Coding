/* JavaScript没有队列的概念，但可以使用Array实现队列的功能 */

const stack = []
// 入队列
stack.push(1)
stack.push(2)
// 出栈
const item1 = stack.shift()
const item2 = stack.shift()