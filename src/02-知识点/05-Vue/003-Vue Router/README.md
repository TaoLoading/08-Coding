# vue-router

## 基础使用

### 第一步：声明路由

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
import App from './App.vue'
import router from './router/index'

const app = createApp(App)
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

### 读取参数

使用`$route.params(Vue2)`或`route.params(Vue3)`读取动态路由参数

## 路由跳转

### 声明式导航

```vue
<router-link to="/home">Home</router-link>
<router-link :to="{name:'home', params:{id:1}}"></router-link>
```

### 编程式导航

```js
const router = useRouter()

router.push('/home')
// 替换当前路由。相较 push，replace 不会将当前路由记录放到历史记录中，意味着不能使用浏览器的后退键返回之前的路由
router.replace('/about')
```

## 路由传参

### 传参类型

1. params 参数。参数不会显示在地址栏内，传参形式：

   ```vue
   // 声明式
   <router-link :to="{ name: 'user', params: { userId: '123' }}">User</router-link>
   
   // 编程式
   router.push({ name: 'user', params: { userId: '123' }})
   ```

2. query 参数。参数会显示在地址栏内，传参形式：

   ```vue
   // 声明式
   <router-link :to="{ path: '/user', query: { userId: '123' }}">User</router-link>
   <router-link :to="{path:'/home/?id=1'}"></router-link>
   
   // 编程式
   router.push({ path: '/user', query: { userId: '123' }})
   ```

注：还可使用 props 进行传参，但使用度极低，故略过

### 读取参数

```js
const route = useRoute()

// params 参数
route.params.xxx

// query 参数
route.query.xxx
```

## $route 和 $router

### $route

路由信息对象，包含了当前路由的路径、参数等信息

### $router

路由实例对象，包含了路由用于编程式导航的方法，比如跳转

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
2. hash 路由兼容性更好，因为 history 路由需要 `history.pushState` （HTML5 API）支持，并且 history 需要配置服务器来匹配路由

### 设置

1. 3.x 版本

   ```js
   // hash 模式
   mode: 'hash'
   
   // history 模式。默认
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

## 路由守卫

### 按执行时间分类

1. 全局前置守卫（***beforeEach，常用***）：在路由切换开始之前触发，用于检查用户是否有权限访问页面
2. 全局解析守卫（beforeResolve）：在路由组件被解析之后触发，用于执行需要等组件加载完毕后的相关操作
3. 全局后置守卫（afterEach）：在路由切换完成之后触发，用于处理页面滚动到锚点等操作

### 按功能返回分类

1. 全局路由守卫（***常用***）

   ```js
   /**
    * to：到哪个路由
    * from：从哪个路由来
    * next：是一个函数，用于控制路由行为
    *    1. next()：允许跳转
    *    2. next(false)：不允许跳转
    *    3. next('/login')：跳转到登录页
    *    4. next(error)：抛出错误，错误是一个 Error 对象
    */
   router.beforeEach((to, from, next) => {
     // ...，逻辑判断是否 next()
     next()
   })
   ```

2. 路由独享的守卫

   ```js
   const routes = [
     {
       path: '/users/:id',
       component: UserDetails,
       beforeEnter: (to, from) => {
         // ...，与全局路由守卫操作一致
       }
     }
   ]
   ```

3. 组件内的守卫

   ```js
   const myComponent = {
       // 在路由进入组件之前调用
     beforeRouteEnter(to, from) {
     },
       // 在路由改变，但是该组件被复用时调用
     beforeRouteUpdate(to, from) {
     },
       // 在路由离开该组件时调用
     beforeRouteLeave(to, from) {
     }
   }
   ```

## 实现路由

### 思路

1. 借助 hash 或者 history api 实现 url 跳转页面不刷新
2. 监听 hashchange 事件或者 popstate 事件处理跳转
3. 根据 hash 值或者 history 路由值渲染对应的组件

### 实现

见子文件

## 路由懒加载

### 作用

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。利用路由懒加载我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样会更加高效，实现性能优化
### 原理

当 component 的配置是一个返回 Promise 的函数时，则 Vue Router 只会在第一次进入页面时才会获取这个函数。这也就是异步路由

### 使用

```js
// 直接引入，未使用路由懒加载
// import UserDetails from './views/UserDetails'

// 使用路由懒加载
const UserDetails = () => import('./views/UserDetails')

const router = createRouter({
  routes: [{ path: '/users/:id', component: UserDetails }]
})
```

