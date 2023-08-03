# vue-router

## 基础使用

### 第一步：注册路由

知识点：

1. 嵌套路由
2. 重定向
3. 动态路由

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginPage.vue')
    },
    {
      path: '/platform',
      name: 'platform',
      component: () => import('@/layout/LayoutPage.vue'),
      children: [
        {
          path: '/platform',
          redirect: '/platform/dataAnalysis'
        }
      ]
    }
  ]
})

export default router
```

### 第二步：使用路由

```js
import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import App from './App.vue'
import router from './router/index'

const app = createApp(App)
app.use(ArcoVue)
app.use(router)
app.mount('#app')
```

### 第三步：匹配显示路由

```vue
<template>
  <router-view />
</template>
```

## 动态路由

### 定义

利用传递路径参数来匹配路由的情况

### 形式

```js
const routes = [
  { path: '/user/:id', component: UserDetail },
  { path: '/food/:id?', component: FoodDetail } // 可选参数
]
```

## 路由跳转

### 声明式导航

```vue
<router-link to="/home">Home</router-link>
<router-link :to="{name:'home', params:{id:1}"></router-link>
```

### 编程式导航

```js
this.$router.push('/home')
// 替换当前路由。相较 push，replace 不会将当前路由记录放到历史记录中，意味着不能使用浏览器的后退键返回之前的路由
this.$router.replace('/about')
```

## 路由传参

### 传参类型

1. params 参数。参数不会显示在地址栏内，传参形式：

   ```vue
   // 声明式
   <router-link :to="{ name: 'user', params: { userId: '123' }}">User</router-link>
   
   // 编程式
   this.$router.push({ name: 'user', params: { userId: '123' }})
   ```

2. query 参数。参数会显示在地址栏内，传参形式：

   ```vue
   // 声明式
   <router-link :to="{ path: '/user', query: { userId: '123' }}">User</router-link>
   <router-link :to="{path:'/home/?id=1'}"></router-link>
   
   // 编程式
   this.$router.push({ path: '/user', query: { userId: '123' }})
   ```

注：还可使用 props 进行传参，但使用度极低，故略过

### 读取参数

```js
// params 参数
this.$route.params.xxx

// query 参数
this.$route.query.xxx
```

## $route 和 $router

### $route

路由信息对象，包含了当前路由的路径、参数等信息

### $router

路由示例对象，包含了路由用于编程式导航的方法，比如跳转

## useRoute() 和 useRouter()

Vue3 中抛弃了$route 和 $router，使用 useRoute() 和 useRouter() 进行代替，具体功能与其类似

### useRoute()

```js
const route = useRoute()

console.log(route.params)
```

### useRouter()

```js
const router = useRouter()

router.push('/')
```

本文多处使用 $route 和 $router 进行演示，均可替换为 route 和 router

## history 路由和 hash 路由

### 区别

1. hash 路由在 url 有"#"，如`https://example.com/#/about`，而 history 路由中没有
2. hash 路由兼容性更好，因为 history 路由需要 history.pushState API（HTML5）支持，并且 history 需要配置服务器来匹配路由

### 设置

1. 3.x 版本

   ```js
   // history 模式。默认   
   mode: 'history'
   
   // hash 模式
   mode: 'history'
   ```

2. 4.x 版本

   ```js
   // hash 模式
   history: createWebHashHistory()
   
   // history 模式
   history: createWebHistory()
   ```

### history 路由下点击页面报 404

原因

1. 在为配置服务器的情况下，浏览器会根据 url 地址去寻找资源，history 路由下是`https://example.com/about`，则会按照`https://example.com/about`路径去寻找资源，而在 SPA 应用中路由的控制是由前端实现的，服务器中并没有与`https://example.com/about`相对应的资源，故报错
2. 在 hash 路由下，虽然请求的是`https://example.com/#/about`，但会按照`https://example.com`去服务器中寻找资源，故不报错

解决

1. 方法 1：配置 webpack 中的 dev-server，historyApiFallback: true

2. 方法 2：配置 Nginx

   ```
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

注：以上两种方法的思路都是当服务器中查询不到资源时重定向到 index.html

### history 路由下在子级路由刷新页面时报错

原因：引用了某些外部文件，并且引用的链接形式为 './xxx'，导致查询不到资源

解决：在引用时采用 '/xxx' 的形式，并且配置 publicPath: '/'

### hash 路由的特点

hash 部分（#和#之后的参数）不会被发送到服务器

## 结合 keep-alive 的使用

### 作用

在切换路由时，路由会销毁 A 路由创建 B 路由。keep-alive 可以将组件缓存起来，保存其状态，使得在频繁切换时不需要重复创建和销毁

### 使用

1. 方法 1，直接缓存路由

   ```vue
   <keep-alive>
     <myComponent></myComponent>
   </keep-alive>
   ```

2. 方法 2，指定缓存和不缓存的路由

   ```vue
   <keep-alive include="myComponent"> // 使用 include 指定需要缓存的路由
     <router-view></router-view>
   </keep-alive>
   
   <keep-alive exclude="myComponent"> // 使用 exclude 指定排除缓存的路由
     <router-view></router-view>
   </keep-alive>
   ```

   
