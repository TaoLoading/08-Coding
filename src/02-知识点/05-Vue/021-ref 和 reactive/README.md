# ref 和 reactive

## 区别

1. 定义响应式数据
   1. ref 可以处理所有类型的值
   2. reactive 只能处理对象类型
   3. 当 ref 中接收的是对象类型的值时，其内部依然使用 reactive 实现响应式
2. 读取响应式数据
   1. 在 js 中，读取 ref 返回的响应式数据需要加上`.value`
   2. 读取 reactive 返回的响应式数据则不需要加
3. 解构响应式数据
   1. 解构 ref 返回的响应式数据时返回的数据依然是响应式的
   2. reactive 解构出来的数据不是响应式的，可结合 toRefs 使用
4. 实现原理
   1. ref：Vue 会创建一个包含`.value`属性的对象，这个对象被转化成`Proxy`对象，通过拦截`get/set`实现对值的监听
   2. reactive：Vue 直接使用 Proxy 代理整个对象，通过拦截`get/set`实现对值的监听

## ref 获取 DOM 元素

### Vue2

```vue
<template>
  <div>
    <p ref="paragraph">This is a paragraph.</p>
  </div>
</template>

<script>
export default {
  ...
  const paragraphElement = this.$refs.paragraph
}
</script>
```

### Vue3

```vue
<template>
  <p ref="paragraph">This is a paragraph.</p>
</template>

<script setup lang="ts">
  const paragraphElement = ref<HTMLElement | null>(null)
  paragraphElement.value
</script>
```
