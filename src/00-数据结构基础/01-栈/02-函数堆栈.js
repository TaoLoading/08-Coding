/**
 * 通过调试观察函数入栈和出栈顺序
 */

const func1 = () => {
  func2()
}
const func2 = () => {
  func3()
}
const func3 = () => { }

func1()
