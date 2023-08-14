# 为什么组件中的 data 设计为函数

## 源码

```js
// 自定义组件
function initData(vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
    ......
}
```

## 原因

1. 通过源码可知，当 data 为函数时，会将这个函数执行，当为对象时，则直接使用
2. 组件代码最终被编译为 class 类，组件存在复用的可能，每次使用都是对这个类进行实例化。当使用对象形式定义 data 时，则多个组件实例共用一个 data 对象，则会导致数据污染
3. 使用函数形式定义 data 时，创建组件实例时会将这个函数执行一次返回新的对象，从而避免了数据污染

## 根实例中不强制使用函数

Vue 根实例中不强制使用函数，因为根实例只有一个，不需要担心数据污染的问题
