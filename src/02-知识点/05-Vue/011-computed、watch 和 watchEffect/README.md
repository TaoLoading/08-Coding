# computed、watch 和 watchEffect 

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

watch 用于监听某个响应式数据的变化并执行相应的回调函数，一般用于需要在数据变化时执行异步或复杂的逻辑操作

### 用法

```vue
// Vue2
<script>
export default {
  data: {
    message: 'Hello, Vue!'
  },
  watch: {
    message: {
      handler(newValue, oldValue) {
        console.log('newValue', newValue)
        console.log('oldValue', oldValue)
      },
      // 是否在初始化时立即执行
      immediate: true,
      // 是否深度监听，针对引用数据类型
      deep: false
    }
  }
}
</script>

// Vue3
<script setup>
import { watch } from 'vue'
const message = ref('Hello, Vue!')
// 基本数据类型
watch(message.value, (newValue, oldValue) => {
  console.log('newValue', newValue)
  console.log('oldValue', oldValue)
})

const message = reactive({
  info: 'Hello, Vue!'
})
// 引用数据类型，即监听对象中的某个属性
watch(() => message.info, (newValue, oldValue) => {
  console.log('newValue', newValue)
  console.log('oldValue', oldValue)
})
</script>
```

### Vue3 中 watch 的变化

1. 写法不同。注意 Vue3 中监听基本数据类型和对象中属性时，写法也是不同的

2. 可监听多个数据

   ```vue
   <script setup>
   const a = ref(1)
   const b = ref(2)
   watch([a, b], ([newA, newB], [oldA, oldB]) => {
     ......
   })
   </script>
   ```

3. 增加停止监听的函数。Vue3 中可以使用 watch 返回的停止监听函数来停止对数据源的监听

   ```vue
   <script setup>
   const stop = watch(xxx, (newValue, oldValue) => {
     ......
   })
   
   stop()
   </script>
   ```

## watchEffect

### 作用

watchEffect 是 Vue3 中一个用于自动追踪响应式数据变化并执行相应副作用函数的函数

### 用法

```vue
<script setup>
import { watch } from 'vue'
const person = reactive({
  age: 30,
  name: 'John'
})

watchEffect(() => {
  // 副作用函数，它会自动追踪内部响应式数据的变化
  console.log(`Age changed: ${person.age}`)
  console.log(`Name changed: ${person.name}`)
})
</script>
```

### 与 watch 的区别

1. 数据监听方式。watch 需要指定被监听的数据，watchEffect 会自动追踪副作用函数内部的响应式数据实现监听
2. 初始化是否执行。watch 不会在初始化时执行，除非设置 immediate，watchEffect 会在初始化时执行

## computed 和 watch 的区别

1. 缓存性：computed 具有缓存性，当访问某个计算属性时，只有当被依赖的数据发生变化时才会重新计算，而被依赖数据没有变化时则直接返回缓存的结果，不会再次计算
2. 返回值：computed 中有返回值，而 watch 中没有
3. 应用场景：
   1. computed 一般用于需要派生新数据的场景，如简化模板中用到的复杂的数据
   2. watch 一般用于需要在数据变化时执行异步或复杂的逻辑操作
4. 使用方式：
   1. computed 可传递对象，使计算属性既可读又可写
   2. watch 可设置 deep、immediate 等选项实现更高级的功能
