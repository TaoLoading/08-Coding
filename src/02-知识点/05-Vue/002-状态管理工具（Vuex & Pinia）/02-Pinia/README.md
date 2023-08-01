# Pinia

## 使用步骤

1. 入口文件中创建 Pinia 实例，并绑定到 Vue 应用上

   ```js
   // Vue3
   
   import { createApp } from 'vue'
   import { createPinia } from 'pinia'
   import App from './App.vue'
   
   const app = createApp(App)
   app.use(createPinia())
   
   app.mount('#app')
   ```

   ```js
   // Vue2
   
   import Vue from 'vue'
   import { createPinia, PiniaVuePlugin } from 'pinia'
   
   Vue.use(PiniaVuePlugin)
   const pinia = createPinia()
   
   new Vue({
     el: '#app',
     pinia
   })
   ```

2. 创建 store。见 01-基础使用.js

3. 使用 store

   1. 解构数据

      ```vue
      <template>
        <p>{{ msg }}</p>
        <p>{{ count }}</p>
      </template>
      
      <script setup lang="ts">
      import { storeToRefs } from 'pinia'
      import { useMainStore } from '../store/index'
      
      const store = useMainStore()
      
      // 使用 storeToRefs 结构容器中的数据，以确保响应式正常
      const { msg, count } = storeToRefs(store)
      </script>
      ```

   2. 修改数据

      1. 单条数据修改直接使用 store.属性名 的形式

      2. 多条数据修改使用 $patch

         ```js
         // 方式 1
         store.$patch({
          msg: 'hello',
          count: store.count + 1
         })
         
         // 方式 2
         store.$patch(state => {
          state.msg = 'hello'
          state.count++
         })
         ```

      3. 逻辑比较多时封装到 actions 中进行修改，在页面内调用

         ```js
         // actions 内定义
         actions: {
           changeData() {
             this.msg = 'world'
             this.count++
           }
         }
         
         // 页面内使用
         store.changeData()
         ```
