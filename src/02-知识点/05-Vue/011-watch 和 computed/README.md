# computed 和 watch

## computed

### 作用

computed 用于依赖于已经存在的响应式数据的派生出新的数据，并根据所依赖数据的变化而变化，一般用于需要派生新数据的场景，如简化数据

### 用法

1. 基础使用

   ```vue
   // Vue2
   <script>
   export default {
     computed: {
       fullName() {
         return this.firstName + ' ' + this.lastName
       }
     }
   }
   </script>
   
   // Vue3
   <script setup>
   import { computed } from 'vue'
   const fullName = computed(() => firstName.value + ' ' + lastName.value)
   </script>
   ```

2. 将数据变为既可读又可写

   ```vue
   // Vue2
   <script>
   export default {
     computed: {
       fullName() {
         get() {
           return this.firstName + ' ' + this.lastName
         },
         // 可写计算属性
         set(newValue) {
           this.fullName = newValue
         }
       }
     }
   }
   </script>
   
   // Vue3
   <script setup>
   import { computed } from 'vue'
   const fullName = computed({
     get: () => {
       return firstName.value + ' ' + this.lastName.value
     },
     set: (newValue) => {
       fullName.value = newValue
     }
   })
   </script>
   ```

## watch

### 作用

watch 用于监视某个数据的变化并执行相应的回调函数，一般用于需要在数据变化时执行异步或复杂的逻辑操作

### 用法

```vue

```



## 区别

1. 缓存性：computed 具有缓存性，当访问某个计算属性时，只有当被依赖的数据发生变化时才会重新计算，而被依赖数据没有变化时则直接返回缓存的结果，不会再次计算
2. 返回值：computed 中有返回值，而 watch 中没有
3. 应用场景：
   1. computed 一般用于需要派生新数据的场景，如简化模板中用到的复杂的数据
   2. watch 一般用于需要在数据变化时执行异步或复杂的逻辑操作
4. 使用方式：
   1. computed 可传递对象，使计算属性既可读又可写
   2. watch 可设置 deep、immediate 等选项实现更高级的功能
