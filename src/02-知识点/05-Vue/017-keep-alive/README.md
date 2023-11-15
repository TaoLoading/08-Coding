# keep-alive

## 作用

在切换组件时，会销毁 A 组件创建 B 组件。keep-alive 可以将组件缓存起来，保存其状态，使得在频繁切换时不需要重复创建和销毁

## 使用

1. 方法 1：直接指定要缓存的组件

   ```vue
   <keep-alive>
     <myComponent></myComponent>
   </keep-alive>
   ```

2. 方法 2：指定缓存与不缓存的组件

   ```vue
   // Vue2
   <keep-alive include="myComponent"> // 使用 include 指定需要缓存的路由
     <router-view></router-view>
   </keep-alive>
   
   <keep-alive exclude="myComponent"> // 使用 exclude 指定排除缓存的路由
     <router-view></router-view>
   </keep-alive>
   
   // Vue3
   <router-view v-slot="{ Component }">
     <keep-alive :include="myComponent">
       <component :is="Component"></component>
     </keep-alive>
   </router-view>
   ```

3. 方法 3：缓存动态组件

   ```vue
   <KeepAlive>
     <component :is="activeComponent" />
   </KeepAlive>
   ```
