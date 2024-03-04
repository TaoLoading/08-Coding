# Mixin 混入

## 作用

Mixin（混入）是一种代码复用机制，可以将组件中可复用的逻辑提取出来封装为一个 Mixin，在需要的组件中引入，从而实现代码复用

## 用法

### 封装 Mixin

```js
export const myMixin = {
  data() {
    return {
      mixinData: 'This data is from the mixin'
    }
  },
  methods: {
    mixinMethod() {
      console.log('Mixin method called')
    }
  }
}

```

### 使用 Mixin

```vue
<template>
  <div>
    <p>{{ mixinData }}</p>
    <button @click="mixinMethod">Call Mixin Method</button>
    <p>{{ componentData }}</p>
    <button @click="componentMethod">Call Component Method</button>
  </div>
</template>

<script>
// 引入 Mixin
import { myMixin } from './myMixin'

export default {
  name: 'MyComponent',
  // 使用 Mixin
  mixins: [myMixin],
  data() {
    return {
      componentData: 'This data is from the component'
    }
  },
  methods: {
    componentMethod() {
      console.log('Component method called')
    }
  }
}
</script>
```

## 缺点

命名冲突、属性覆盖、难以追踪来源、维护困难

## 与组件的执行情况

1. 生命周期钩子重复：当 Mixin 和组件中包含相同的生命周期钩子时，首先执行 Mixin 中的钩子，然后执行组件本身的钩子

2. 方法名重复：当 Mixin 和组件中包含相同的方法时，组件本身的方法将会覆盖 Mixin 中的方法，即 Mixin 中的方法不会执行

## 其他实现代码复用的方法

1. hook（Vue3）
2. 插槽
