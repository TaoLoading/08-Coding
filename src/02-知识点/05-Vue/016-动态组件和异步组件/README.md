# 动态组件和异步组件

## 动态组件

### 概念

根据数据动态地渲染不同组件的技术

### 用法

可以使用 `<component>` 元素加上一个特殊的 `is` 属性来创建动态组件。`is` 属性的值是组件的名字

```vue
<template>
  <button @click="toggleComponent">Toggle Component</button>
  <component :is="currentComponent"></component>
</template>

<script setup>
import FirstComponent from './FirstComponent.vue'
import SecondComponent from './SecondComponent.vue'

const currentComponent = ref('FirstComponent')
const toggleComponent = () => {
  if (currentComponent.value === 'FirstComponent') {
    currentComponent.value = 'SecondComponent'
  } else {
    currentComponent.value = 'FirstComponent'
  }
}
</script>
```

## 异步组件

### 概念

按需加载组件的技术

### 作用

1. 当不使用异步路由时，在应用初始化时所有组件都会被加载，对于大型应用会导致加载时间变长。异步组件允许只在需要时对组件进行加载，从而提高应用的性能和加载速度
2. **异步路由（路由懒加载）**也可实现按需加载，但注意**异步组件**和**异步路由**并不是一个东西，二者可以结合使用。使用时需要注意***在定义异步路由时不能使用异步组件，但可以在使用异步路由定义的组件内使用异步组件***

### 用法

```vue
// Vue2 中定义异步组件
<script>
const AsyncComp = () => import('./customComponent.vue')
</script>

// Vue3 中定义异步组件
<script setup>
import { defineAsyncComponent } from 'vue' 
    
// 普通形式
const AsyncComp = defineAsyncComponent(() => import('./customComponent.vue'))

// 结合 Promise
const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    resolve(/* 可以从服务器加载组件 */)
  })
})
</script>

// 使用异步组件
<template>
  <AsyncComp />
</template>
```
