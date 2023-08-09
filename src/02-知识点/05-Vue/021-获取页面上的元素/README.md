# 获取页面上的元素

## Vue2

使用$ref

```vue
<template>
  <div>
    <p ref="paragraph">This is a paragraph.</p>
  </div>
</template>

<script>
export default {
  mounted() {
    const paragraphElement = this.$refs.paragraph
  }
}
</script>
```

## Vue3

使用 ref

```vue
<template>
  <p ref="paragraph">This is a paragraph.</p>
</template>

<script setup lang="ts">
  const paragraph = ref<HTMLElement | null>(null)
</script>
```
