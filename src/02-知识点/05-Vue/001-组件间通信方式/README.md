# 组件间通信方式

## Vue2

### props

1. 方向：父向子

2. 代码：

   ```vue
   <!-- 父组件 -->
   <template>
     <child :msg="msg"></child>
   </template>
   ```

   ```vue
   <!-- 子组件 -->
   <script>
   export default {
     props: ['msg'],
     props: {
       msg: {
         type: String,
         default: '这是默认数据',
         required: true
       }
     },
     mounted() {
       console.log(this.msg)
     }
   }
   </script>
   ```

### $emit/v-on

1. 方向：子向父

2. 原理：事件的传播与监听

3. 步骤：

   1. 在子组件中使用$emit 触发一个事件，传入参数
   2. 自定义事件会沿着组件的父链向上传播，直到找到第一个监听该事件的父组件
   3. 父组件中使用 v-on 监听该事件，并指定执行的方法，接收参数

4. 代码：

   ```vue
   <!-- 子组件 -->
   <template>
     <button @click="sendData">Send Data</button>
   </template>
   
   <script>
   export default {
     methods: {
       sendData() {
         const data = 'Hello, parent!'
         this.$emit('custom-event', data)
       }
     }
   }
   </script>
   ```

   ```vue
   <!-- 父组件 -->
   <template>
     <div>
       <child-component @custom-event="handleEvent"></child-component>
       <p>Received data: {{ receivedData }}</p>
     </div>
   </template>
   
   <script>
   import ChildComponent from './ChildComponent.vue'
   
   export default {
     components: {
       ChildComponent
     },
     data() {
       return {
         receivedData: ''
       }
     },
     methods: {
       handleEvent(data) {
         this.receivedData = data
       }
     }
   }
   </script>
   ```

### EventBus（事件总线）

1. 方向：任意组件

2. 原理：在 Vue 的原型对象挂在一个全局都能读到的对象，通过这个对象对事件进行分发与监听，实现任意组件通信

3. 步骤：类似$emit/v-on

4. 代码：

   ```vue
   <!-- 全局，定义 EventBus -->
   // 方法一
   // 抽离成一个单独的 js 文件 Bus.js，然后在需要的地方引入
   // Bus.js
   import Vue from 'vue'
   export default new Vue()
   
   // 方法二 直接挂载到全局（本代码采用）
   // main.js
   import Vue from 'vue'
   Vue.prototype.$bus = new Vue()
   
   // 方法三 注入到 Vue 根对象上
   // main.js
   import Vue from 'vue'
   new Vue({
       el:"#app",
       data:{
           Bus: new Vue()
       }
   })
   ```

   ```vue
   <!-- 发送事件的组件 -->
   <script>
   export default {
     methods: {
       sendData() {
         const data = 'Hello, receiver!'
         this.$bus.$emit('custom-event', data)
       }
     }
   }
   </script>
   ```

   ```vue
   <!-- 监听事件的组件 -->
   <script>
   export default {
     created() {
       this.$bus.$on('custom-event', this.handleEvent)
     },
     beforeDestroy() {
       this.$bus.$off('custom-event', this.handleEvent)
     },
     methods: {
       handleEvent(data) {
         console.log('Received data:', data)
       }
     }
   }
   </script>
   ```

5. 注意：在组件销毁前要取消监听，防止内存泄漏、

### slot（插槽）

### ref

### .sync

### v-model

### $children / $parent

### $attrs / $listeners

### provide / inject

### Vuex

### $root

## Vue3
