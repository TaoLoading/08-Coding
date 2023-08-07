# .native 修饰符

## 解决问题

在父组件中对子组件绑定点击事件时，在 Vue2 中可能无法触发

## 作用

.native 修饰符的作用是在组件的根元素上监听原生事件

## 代码示例

```vue
<template>
  <div>
     <!-- 不加.native 无法触发 -->
    <child-component @click.native="onClick"></child-component>
  </div>
</template>

<script>
export default {
  methods: {
    onClick() {
      console.log('clicked')
    }
  }
}
</script>
```

## Vue3 中移除

Vue3 中，.native 修饰符已经被移除了，因为 Vue3 中的组件可以直接接收任何事件监听器
