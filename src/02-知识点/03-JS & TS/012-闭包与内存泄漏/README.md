# 闭包

## 概念

* 闭包是一个存在内部函数的引用关系

* 该引用指向的是外部函数的局部变量对象

## 形成条件

- 函数嵌套
- 内部函数引用外部函数的局部变量
- 内部函数被使用。注意：函数变量提升的时候如果内部函数没有被使用，在预解析的过程中不会定义内部函数

## 例子

```js
function createCounter() {
  let count = 0

  return function () {
    return ++count
  }
}

const counter = createCounter()
```

```js
// 定时器被使用，并且定时器中的箭头函数了外部的 msg 变量
function showMsgDelay(msg, time) {
  setTimeout(() => {
    console.log(msg)
  }, time)
}

showMsgDelay('hello', 1000)
```

## 优缺点

* 优先
  1. 在函数外部能够访问到函数内部的变量。通过使用闭包，可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来创建私有变量
  2. 延长外部函数变量对象的生命周期。因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收

* 缺点
  1. 由于延长外部函数变量对象的生命周期，占用了内存，如果不及时清除容易造成内存泄漏

## 防止闭包引起内存泄漏

及时对闭包进行清理，使内部函数成为垃圾对象，即指向为 null

```js
function fn1() {
  let a = 2

  function fn2() {
    a++
    console.log(a)
  }

  return fn2
}

const f = fn1()
f() // 3
f() // 4

// 释放
f = null
```

## 应用场景

1. 封装私有变量和方法

   ```js
   function counter() {
     // 私有变量
     let count = 0
   
     // 私有方法
     function increment() {
       count++
       console.log(count)
     }
   
     return increment
   }
   
   const myCounter = counter()
   myCounter() // 输出：1
   myCounter() // 输出：2
   ```

   

2. 模块化开发

   ```js
   const myModule = (function() {
     // 私有变量
     const privateVar = 'I am private'
   
     // 私有方法
     function privateMethod() {
       console.log(privateVar)
     }
   
     // 公共方法
     function publicMethod() {
       privateMethod()
       console.log('I am public')
     }
   
     return {
       publicMethod: publicMethod
     }
   })()
   
   myModule.publicMethod() // 输出：I am private, I am public
   ```

   # 内存泄漏
   
   ## 除闭包外，引起内存泄漏的方式
   
   1. 循环引用：当两个或多个对象相互引用，且没有外部引用指向它们时，就形成了循环引用。这会导致垃圾回收器无法回收它们，从而造成内存泄漏
   
      ```js
      function createObjects() {
        let obj1 = {}
        let obj2 = {}
      
        obj1.ref = obj2
        obj2.ref = obj1
      
        // 未访问 obj1 和 obj2，但它们相互引用无法被回收
      }
      createObjects()
      ```
   
      
   
   2. 未正确移除事件监听器：在添加事件监听器后，如果未正确地移除它们，那么事件监听器将继续保持对对象的引用，导致对象无法被垃圾回收
   
      ```js
      function addEventListener() {
        const element = document.getElementById('myElement')
      
        element.addEventListener('click', function() {
          // 事件处理逻辑
        })
      
        // 未移除事件监听器，element 无法被回收。使用 removeEventListener 移出
      }
      addEventListener()
      ```
   
      
   
   3. 定时器未清理：使用 `setInterval` 创建的定时器，如果未手动清除或取消，将一直保持对回调函数的引用，导致回调函数所引用的作用域中的对象无法被回收
   
      ```js
      function createTimer() {
        const obj = {}
      
        setInterval(function() {
          // 定时器回调逻辑
          console.log(obj)
        }, 1000)
      
        // 未清除定时器，obj 无法被回收
      }
      createTimer()
      ```
   
      
   
   4. 大量无用的缓存数据：在应用程序中，如果大量的数据被缓存并长时间保留，而实际上这些数据并不再需要，就会占用大量内存空间，导致内存泄漏
   
      ```js
      let cache = {}
      
      function fetchData(key) {
        if (cache[key]) {
          return cache[key]
        }
      
        // 从网络或其他地方获取数据
        const data = expensiveDataFetch()
        // 缓存数据
        cache[key] = data
        return data
      }
      
      // 未清理不再使用的缓存数据，占用内存
      ```
   
      