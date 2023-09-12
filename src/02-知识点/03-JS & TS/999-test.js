function mySetTimeout(fn, delay) {
  const timer = setInterval(() => {
    fn()
    clearInterval(timer)
  }, delay)
}

// 测试
const testFn = () => {
  console.log('输出成功')
}
mySetTimeout(testFn, 3000)
