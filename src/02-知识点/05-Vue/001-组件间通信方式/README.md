# 组件间通信方式

## Vue2（12 种）

### props

1. 方向：父向子

2. 代码：

   ```vue
   <!-- 父组件 -->
   <template>
     <child-component :msg="msg"></child-component>
   </template>
   ```

   ```vue
   <!-- 子组件 -->
   <script>
   export default {
     // 方式一：数组形式接收
     props: ['msg'],
     // 方式二：对象形式接收
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

### $emit / v-on

1. 方向：子向父

2. 原理：事件的传播与监听

3. 步骤：

   1. 在子组件中使用 $emit 触发一个事件，传入参数
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

3. 步骤：类似 $emit/v-on

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

1. 方向：父向子

2. 步骤：

   1. 子组件中使用`<solt name="插槽名"></solt>`指定插槽位置，用于渲染父组件传来的内容
   2. 父组件中引入子组件，并使用`<template #custom-slot></template>`定义插槽，其中放入需要渲染的内容
   3. 注意：此方式使用的是具名插槽，也可使用匿名插槽

3. 代码：

   ```vue
   <!-- 子组件 -->
   <template>
     <div>
       <slot name="custom-slot"></slot>
     </div>
   </template>
   ```

   ```vue
   <!-- 父组件 -->
   <template>
     <div>
       <child-component>
         <template #custom-slot>
           <!-- 传递到子组件的内容 -->
           <p>xxx</p>
         </template>
       </child-component>
     </div>
   </template>
   ```

### Vuex

1. 方向：任意组件
2. 原理：Vuex 是专门为 Vue.js 应用程序开发的状态管理工具
3. 方法：见 "002-状态管理工具（Vuex & Pinia）"

### ref

1. 方向：父向子

2. 原理：对子组件使用`ref`来获取子组件的实例，可对子组件进行相关操作

3. 代码：

   ```vue
   <!-- 父组件 -->
   <template>
     <child-component ref="child"></child-component>
   </template>
   
   <script>
   export default {
     mounted(){
       const child = this.$refs.child
       // 使用子组件中定义的属性
       console.log(child.xxx)
       // 使用子组件中定义的方法
       child.someMethod()
     }
   }
   </script>
   ```

### provide / inject

1. 方向：父组件向子孙组件

2. 原理：

   1. `provide（提供）`和`inject（注入）`是 Vue 中用于实现组件间传递数据的选项，它们允许父组件向子孙组件传递数据
   2. `provide` 选项允许父组件提供数据，使其在组件树中的所有子孙组件中可用。父组件通过在组件实例上定义`provide`属性，并将其设置为一个对象，将数据提供给子孙组件
   3. `inject`选项允许子孙组件注入父组件提供的数据。子孙组件通过在组件选项中使用 `inject` 属性来声明要注入的数据。被注入的数据将在组件实例中作为响应式属性可用

3. 代码

   ```vue
   <!-- 父组件 -->
   <template>
     <div>
       <child-component></child-component>
     </div>
   </template>
   
   <script>
   export default {
     provide: {
       message: 'Hello from parent'
     }
   }
   </script>
   ```

   ```vue
   <!-- 子组件 -->
   <template>
     <div>
       <p>{{ injectedMessage }}</p>
     </div>
   </template>
   
   <script>
   export default {
     inject: ['message'],
     computed: {
       injectedMessage() {
         return this.message
       }
     }
   }
   </script>
   ```


### $children / $parent

1. 方向：

   1. 父向子：`$children`属性用于访问子组件，实现父向子通信
   2. 子向父：`$parent`属性用于访问父组件，实现父向子通信

2. 原理：

   1. `$children`和`$parent`是 Vue 实例上的特殊属性，用于访问组件实例的直接子组件和直接父组件
   2. `$children`属性返回一个数组，包含当前组件实例的所有直接子组件实例
   3. `$parent`属性返回当前组件实例的直接父组件实例

3. 代码：

   ```vue
   <!-- 父组件。实现父向子通信 -->
   <template>
     <div>
       <child-component ref="child"></child-component>
       <button @click="sendMessageToChild">父向子通信</button>
     </div>
   </template>
   
   <script>
   export default {
     methods: {
       sendMessageToChild() {
         this.$children[0].someMethod()
       }
     }
   }
   </script>
   ```

   ```vue
   <!-- 子组件。实现子向父通信 -->
   <template>
     <div>
       <p>{{ message }}</p>
       <button @click="sendMessageToParent">子向父通信</button>
     </div>
   </template>
   
   <script>
   export default {
     methods: {
       sendMessageToParent() {
         this.$parent.receiveMessage('Hello from child')
       }
     }
   }
   </script>
   ```



### $attrs / $listeners

1. 方向：父组件向子孙组件

2. 原理：

   1. `$attrs`和`$listeners`是 Vue 实例上的特殊属性，用于在组件之间传递属性和事件监听器
   2. `$attrs`属性包含父作用域里除 class 和 style 除外的且***未被 props 接收***的属性集合
   3. `$listeners`属性包含父作用域里 .native 除外的监听事件集合

3. 注意：$attrs / $listeners 用于仅传递数据，不做中间处理的场景

4. 代码：

   ```vue
   <!-- 父组件 -->
   <template>
     <child-component :name="name" title="666" ></child-component>
   </template>
   
   <script>
   export default{
     data(){
       return {
         name: "TaoLoading"
       }
     },
     methods: {
       sendMessageToChild() {
         // ...
       }
     }
   }
   </script>
   ```

   ```vue
   <!-- 子组件 -->
   <template>
     <!-- 继续传给孙子组件 -->
     <grandson-component v-bind="$attrs" v-on="$listeners"></grandson-component>
   </template>
   
   <script>
   export default{
     mounted(){
       console.log(this.$attrs) // { name: "TaoLoading", title: 666 }
     }
   }
   </script>
   ```

### .sync

1. 方向：父向子

2. 原理：

   1. `.sync`是 Vue.js 中用于实现双向绑定的一种特殊语法糖
   2. `.sync`可以让子组件能够修改父组件的属性，并且保持父子组件之间的数据同步
   3. `.sync` 实际上是将一个父组件的属性和一个更新该属性的事件一起绑定到子组件上

3. 代码：

   ```vue
   <!-- 父组件 -->
   <template>
     <div>
       <child-component :message.sync="message"></child-component>
     </div>
   </template>
   
   <script>
   export default {
     data() {
       return {
         message: 'Hello from parent'
       }
     }
   }
   </script>
   ```

   ```vue
   <!-- 子组件 -->
   <template>
     <div>
       <p>{{ message }}</p>
       <button @click="updateParentMessage">Update Parent Message</button>
     </div>
   </template>
   
   <script>
   export default {
     props: ['message'],
     methods: {
       updateParentMessage() {
         // 更新 message，注意这个更新是同步的
         this.$emit('update:message', 'New message from child')
       }
     }
   }
   </script>
   ```

### v-model

1. 方向：父向子

2. 原理：与`.sync`类似，是对属性传递和事件监听的封装

3. 代码

   ```vue
   <!-- 父组件 -->
   <template>
     <div>
       <child-component v-model="message"></child-component>
     </div>
   </template>
   
   <script>
   export default {
     data() {
       return {
         message: 'Hello from parent'
       }
     }
   }
   </script>
   ```

   ```vue
   <!-- 子组件 -->
   <template>
     <input :value="value" @input="updateValue" />
   </template>
   
   <script>
   export default {
     props: ['value'],
     methods: {
       updateValue(event) {
         // 更新 message，注意这个更新是同步的
         this.$emit('input', event.target.value)
       }
     }
   }
   </script>
   ```

### $root

1. 方向：子向根
2. 原理：$root 可以访问到根组件 App.vue 的实例
3. 步骤：通过`$root.xx`获得 App.vue 上对应的属性或方法

## Vue3

### props

与 Vue2 类似，只是子组件接收的写法上有区别：

```vue
<!-- 子组件 -->
<script setup>
// 使用 defineProps() 声明属性
const props = defineProps({
   msg: {
      type: String,
      default: '这是默认数据',
      required: true
    }
})
</script>
```

### $emit / v-on

1. 与 Vue2 类似，只是子组件声明事件的写法上有区别：

2. 注意：***useContext API 已于 3.2 版本移除***

3. 代码：

   ```vue
   <!-- 子组件 -->
   <template>
     // 写法一
     <button @click="emit('custom-event')">按钮</buttom>
     // 写法二
     <button @click="handleClick">按钮</buttom>
   </template>
   <script setup>
     // 方法一 适用于 Vue3.2 版本 不需要引入
     import { defineEmits } from 'vue'
     // 对应写法一
     const emit = defineEmits(['custom-event'])
     // 对应写法二
     const handleClick = () => {
       emit('custom-event', '这是发送给父组件的信息')
     }
       
     // 方法二 Vue3.2 之前版本
     import { useContext } from 'vue'
     const { emit } = useContext()
     const handleClick = () => {
       const data = 'Hello, parent!'
       emit('custom-event', data)
     }
   </script>
   ```

### mitt

1. 方向：任意组件

2. 与 EventBus 相比，优点：

   1. 小，不到 200 bytes
   2. 完整的 ts 类型支持
   3. 不依赖 Vue 实例
   4. 可跨框架使用

3. 代码：

   ```vue
   <!-- 发送事件的组件 -->
   <template>
     <button @click="sendMessage">Send Message</button>
   </template>
   
   <script setup>
   import mitt from 'mitt'
   
   // 事件总线实例
   const emitter = mitt()
   const sendMessage = () => {
     // 发布事件
     emitter.emit('custom-event', { some: 'payload' })
   }
   </script>
   ```

   ```vue
   <!-- 发送事件的组件 -->
   <template>
     <div>
       <p>Message received: {{ message }}</p>
     </div>
   </template>
   
   <script setup>
   import mitt from 'mitt'
   
   // 事件总线实例
   const emitter = mitt()
   // 监听事件
   emitter.on('custom-event', (payload) => {
     console.log('接收到的参数:', payload) // { some: 'payload' }
   })
   
   // 组件卸载前取消订阅
   onUnmounted(()=>{
     mitt.off('custom-event',someMethed)
   })
   </script>
   ```

### slot（插槽）

与 Vue2 一致

### expose / ref

1. 方向：子向父

2. 原理：子组件向外暴露属性或方法，父组件获取子组件实例后进一步获取属性或方法

3. 代码：

   ```vue
   <!-- 子组件 -->
   <script setup>
   import { defineExpose } from 'vue'
       
   defineExpose({
     xxx: '这是子组件的属性',
     xxxMethod(){
       console.log('这是子组件的方法')
     }
   })
   </script>
   ```

   ```vue
   <!-- 父组件 -->
   <template>
     <child-component ref="child"></child-component>
     <button @click="handlerClick">按钮</button>
   </template>
   <script setup>
     import { ref } from 'vue'
     
     const child = ref(null)
     const handlerClick = () => {
       // 使用子组件暴露的属性
       console.log(child.value.xxx)
       // 使用子组件暴露的方法
       child.value.xxxMethod()
     }
   </script>
   ```

### provide / inject

1. 与 Vue2 一致

2. 代码：

   ```vue
   <!-- 子组件 -->
   <script setup>
     import { provide } from 'vue'
     provide('name', 'TaoLoading')
   </script>
   ```

   ```vue
   <!-- 父组件 -->
   <script setup>
     import { inject } from 'vue'
       
     const name = inject('name')
     console.log(name) // TaoLoading
   </script>
   ```

### Vuex / Pinia

1. 方向：任意组件
2. 原理：状态管理工具
3. 方法：见 "002-状态管理工具（Vuex & Pinia）"

### v-model

与 Vue2 一致
