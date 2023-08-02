# 为什么组件中 data 设计为函数而根实例中没有限制

## 源码

```js
// 自定义组件
function initData(vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}

    ...
}
```

## 原因

1. 组件存在复用的可能，从源码可知当使用对象形式定义data时，则多个实例共用一个data对象，那么状态变更将会影响所有的组件实例，造成了数据污染
2. 采用函数形式则在 initData() 中是会将其作为工厂函数返回全新data对象，避免了数据污染
3. 而根实例只能有一个，不需要担心这种问题
