# Slots 插槽

## 定义

插槽是一种能够将内容定义在子组件，然后在父组件中填充这部分内容的技术

## 分类

### 默认插槽

子组件：

```vue
<template>
  <div>
    <!-- 默认插槽 -->
    <slot></slot>
  </div>
</template>

```

父组件：

```vue
<template>
  <child-component>
    这里的内容将出现在子组件的默认插槽中
  </child-component>
</template>
```

### 具名插槽

**允许定义多个插槽，每个插槽有自己的名字**

子组件：

```vue
<template>
  <div>
    <!-- 具名插槽 -->
    <slot name="header"></slot>
    <slot name="footer"></slot>
  </div>
</template>

```

父组件：

```vue
<template>
  <child-component>
    <template #header>
      这是头部内容
    </template>

    <template #footer>
      这是底部内容
    </template>
  </child-component>
</template>

```

### 作用域插槽

**允许子组件将数据作为插槽的一部分暴露给使用这个插槽的父组件**

子组件：

```vue
<template>
  <div>
    <!-- 定义作用域插槽 -->
    <slot :scopedData="data"></slot>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      data: '这是需要传递的数据'
    }
  }
}
</script>
```

父组件：

```vue
<template>
  <ChildComponent>
    <!-- 使用作用域插槽。default 是默认插槽名，此处还可简写为：#="slotProps"-->
    <template #default="slotProps">
      <!-- slotProps 是一个对象，包含子组件传递的数据 -->
      {{ slotProps.scopedData }}
    </template>
  </ChildComponent>
</template>

<script>
import ChildComponent from './ChildComponent.vue'

export default {
  components: {
    ChildComponent
  }
}
</script>
```
