# this.$nextTick()

## 解决的问题

Vue 中，数据更新后 DOM 更新不会立即执行，而是通过异步队列的方式进行批量更新，这样可以提高性能。但可能会导致获取不到最新的 DOM

## 作用

1. this.$nextTick() 是一个用于在下次 DOM 更新循环结束后执行回调函数的方法

2. 可以确保在进行 DOM 更新后执行相关操作

## 实现

### 原理

利用了 Vue 的异步更新队列和微任务的机制，将回调函数放到微任务中，从而当 DOM 异步更新完毕后会立即执行回调函数

### 使用 Promise 实现

```js
// 实现
Vue.prototype.$myNextTick = function(callback) {
  return Promise.resolve().then(callback)
}

// 使用
methods: {
  example() {
    this.$myNextTick(() => {
      // 回调函数
    })
  }
}
```





