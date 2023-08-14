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
