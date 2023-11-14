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

2. 定义 store。见 01-定义 store.js

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
      
      // 解构数据，此时的数据无响应式
      const { name, age } = store
      // 使用 storeToRefs 解构数据，此时数据响应式正常
      const { msg, count } = storeToRefs(store)
      </script>
      ```

   2. 修改数据

      1. 单条数据修改直接使用`store.属性名`的形式

      2. 多条数据修改使用`$patch`
   
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
   
      4. 除 $patch 外，还有以下方法：
   
         1. `$reset`：重置状态，将状态重置成为初始值
   
            ```js
            store.$reset()
            ```
   
         2. `$patch`：通过将其 state 属性设置为新对象来替换 Store 的整个状态
   
            ```js
            store.$patch({
              name: 'hello Vue',
              age: 198
            })
            ```
   
         3. `$subscribe`：订阅 store 中的状态变化
   
            ```js
            store.$subscribe((mutation, state) => {
              // 监听回调处理
            }, {
              // 如果在组件的 setup 中进行订阅，当组件被卸载时，订阅会被删除，通过 detached:true 可以让订阅保留
              detached: true
            })
            ```

注：除上述形式外，也可使用 mapStores()、mapState()、mapActions() 对属性或方法进行结构使用
