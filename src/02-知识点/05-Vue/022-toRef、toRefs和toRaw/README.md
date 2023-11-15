# toRef、toRefs 和 toRaw

toRef、toRefs 和 toRaw 是 Composition API 提供的函数，用于处理响应式对象来实现不同的情况

## toRef

### 作用

1. 创建一个响应式引用（ref）到对象的某个属性，当更新这个数据时源对象也会更新，视图也变会更新

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

与 toRef 类似，不过是作用于整个对象，将响应式对象的每个属性都转换为响应式引用（ref）

```vue
<script setup>
import { reactive, toRefs } from 'vue'

const data1 = reactive({
  a: 'a',
  b: 'b',
  c: 1
})
const data2 = reactive({
  d: 'd',
  e: 'e',
  f: 2
})
const { a, b, c } = toRefs(data1)
const { d, e, f } = data2

console.log('a, b, c', a, b, c) // 转换为了 ref 对象
console.log('d, e, f', d, e, f) // d e 2
</script>
```

## toRaw

## 作用

对响应式对象失去响应式，返回响应式对象的原始对象

```vue
<script setup>
import { reactive, toRaw } from 'vue'

const data = reactive({ name: 'TaoLoading' })
const newData = toRaw(data)

console.log('data', data) // 响应式对象
console.log('newData', newData) // 原始对象：{ name: 'TaoLoading' }
</script>
```

