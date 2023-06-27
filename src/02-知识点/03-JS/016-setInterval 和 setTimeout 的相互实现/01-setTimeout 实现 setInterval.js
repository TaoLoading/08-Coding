// 原理：使用递归不停生成 setTimeout 定时器，并赋值给 timer 变量便于清除
function mySetTimeout(fn, delay) {
  let timer = null
  const interval = () => {
    fn()
    timer = setTimeout(interval, delay)
  }
  setTimeout(interval, delay)
  return {
    cancel: () => {
      clearTimeout(timer)
      console.log('清除定时器')
    }
  }
}

// 测试
const testFn = () => {
  console.log('输出成功')
}
const { cancel } = mySetTimeout(testFn, 1000)
setTimeout(() => {
  cancel()
}, 6000)
