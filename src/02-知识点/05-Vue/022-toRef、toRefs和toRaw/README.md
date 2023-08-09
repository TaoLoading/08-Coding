# toRef、toRefs 和 toRaw

toRef、toRefs 和 toRaw 是 Composition API 提供的函数，用于处理响应式对象来实现不同的情况

## toRef

### 作用

1. 创建一个基于响应式对象对应属性的 ref，当更新这个数据时源对象也会更新，视图也变会更新

   ```vue
   <script setup>
   import { reactive, toRef } from 'vue'
   
   const data = reactive({ name: 'TaoLoading' })
   const newData: any = toRef(data, 'name')
   
   const change = () => {
     newData.value = 'Evan Hou'
     console.log('data.name', data.name) // Evan Hou。视图会更新
     console.log('newData.value', newData.value) // Evan Hou。视图会更新
   }
   </script>
   ```

2. 对非响应式对象使用 toRef，数据和源对象的值会发生变化，但视图不会更新

   ```vue
   <script setup>
   import { reactive, toRef } from 'vue'
   
   const data = { name: 'TaoLoading' }
   const newData: any = toRef(data, 'name')
   
   const change = () => {
     newData.value = 'Evan Hou'
     console.log('data.name', data.name) // Evan Hou。视图不会更新
     console.log('newData.value', newData.value) // Evan Hou。视图不会更新
   }
   </script>
   ```

### 应用场景

如父向子组件传参，只想传递某个对象中的属性

## toRefs

### 作用

将响应式对象的每个属性都转换为 ref

```vue
<script setup>
import { reactive, toRefs } from 'vue'

const data = reactive({ name: 'TaoLoading' })
const newData: any = toRef(data, 'name')

const change = () => {
  newData.value = 'Evan Hou'
  console.log('data.name', data.name) // Evan Hou。视图会更新
  console.log('newData.value', newData.value) // Evan Hou。视图会更新
}
</script>
```

## toRaw

## 作用

对响应式对象失去响应式，返回普通对象

```vue
const data = reactive({ name: 'TaoLoading' })
// const data = { name: 'TaoLoading' }
const newData = toRaw(data)

console.log('data', data) // 响应式对象
console.log('newData', newData) // { name: 'TaoLoading' }
```

