# Vue 编码层面性能优化

1. 路由懒加载（异步路由）：当路由被访问时再加载对应组件

   ```js
   const router = createRouter({
     routes: [
       { path: '/foo', component: () => import('./Foo.vue') }
     ]
   })
   ```

2. 异步组件：当组件被使用时再加载对应组件

3. keep-alive：缓存组件，避免重复创建组件

   ```vue
   <router-view v-slot="{ Component }">
     <keep-alive :include="myComponent">
       <component :is="Component"></component>
     </keep-alive>
   </router-view>
   ```

4. 使用 v-show 而非 v-if：避免重复创建 DOM

5. 避免 v-if 和 v-for 同时使用

6. 合理使用 v-once 和 v-memo

   1. v-once：元素只会被渲染一次，不会随数据的改变而再次渲染

      ```vue
      <custom-component v-once></custom-component>
      ```

   2. v-memo：接收一个值或一个数组，也可接收类似`v-memo="myValue === true"`的形式，当内部数据变化或不符合条件时才会重新渲染

      ```vue
      <custom-component v-memo="[myValue]">xxx</custom-component>
      
      <custom-component v-memo="[myValueA, myValueB]">xxx</custom-component>
      
      <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">xxx</div>
      ```

 7. v-lazy：图片懒加载

    ```vue
    <img v-lazy="/static/img/1.png">
    ```

 8. 组件销毁时清除定时器、事件监听

 9. 合理拆分组件

 10. 第三方库按需引入

    ```vue
    import { createApp } from 'vue'
    import { Button, Select } from 'element-plus'
    
    const app = createApp()
    app.use(Button)
    app.use(Select)
    ```

 11. 巨量数据使用虚拟列表

 12. 使用 SSR 服务端渲染
