# Vuex

## 基础

### 概念

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式 + 库**。采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。简单的说，Vuex 就是对 Vue 中多组件的共享状态进行集中式的管理

### 作用

用于多组件之间状态共享的问题。虽然使用通信也可以实现状态共享，但在组件较多时代码相对复杂，需要多个组件保持一致性。Vuex 通过把组件的共享状态抽取出来，以全局单例模式管理，这样任何组件都能用一致的方式获取和修改状态，响应式的数据也能够保证简洁的单向数据流动，我们的代码将变得更结构化且易维护

### 使用

1. 定义 store

2. main.js 中引入

   ```js
   const app = createApp(App)
   app.use(store)
   ```

3. 页面内使用

   ```vue
   <script setup>
   import { useStore } from 'vuex'
   const store = useStore()
   console.log(store.state.name)
   </script>
   ```

## API

### API 使用

1. state：共享的数据状态。使用方法：

   1. 使用`store.state.属性`读取数据

   2. 使用 mapState 将数据映射到计算属性中。这种方式的好处当引用值时是不需要加`store.state`这个前缀，直接将全部值映射到计算属性中，引用时直接使用属性名即可

      ```js
      computed: {
        ...mapState(['name', 'age'])
      }
      ```

2. getters：计算属性，用于从 state 派生出一些状态。使用方法：

   1. 使用`store.getters.方法名`读取值
   2. 使用 mapGetters 将数据映射到计算属性中

3. mutations：包含用于修改状态数据的方法。使用方法：

   1. 使用`store.commit(方法名) `触发
   2. 使用 mapMutations 将方法映射到 methods 中

4. actions：包含用于处理异步操作和复杂逻辑的方法。使用方法：

   1. 使用`store.dispatch(方法名) `触发
   2. 使用 mapActions 将方法映射到 methods 中

5. modules：将 store 对象分割为多个 module，每个 module 都包含自己的 state、mutations、actions、getters，防止 store 对象过于臃肿

### **mutations 和 actions 的区别**

1. mutations：直接修改数据
2. actions：处理异步操作和复杂逻辑。***不直接修改数据***，操作处理完成后通过 commit 触发 mutations 中的事件改变数据

### **为什么不能在 mutations 中进行异步操作**

mutations 必须是同步函数，因为只有这样才能确保在调用 mutation 后立即获取最新的状态。如果在 mutation 中进行异步操作，那么在 mutation 执行的过程中，state 可能会被其他的 mutation 改变，这样就会造成 state 的状态不可预测，违背了 Vuex 的设计理念

### modules

modules 用于在项目过大时拆分 store 对象，通过模块的方式进行维护

**注意：**当读取状态时要加上模块名，如`store.state.moduleA.countA`，而 getters、mutations 和 actions 不需要

```js
const moduleA = {
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  }
}

const moduleB = {
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  }
}

const store = useStore({
  modules: {
    moduleA,
    moduleB
  }
})

export default store
```

## 监听 Vuex 中的数据变化

### watch

```js
watch: {
  'store.state.counter'() {
    console.log('counter change!')
  }
}
```

### store.subscribe()

Vuex 的 API

```js
store.subscribe((mutation, state) => {
  if (mutation.type === 'add') {
    console.log('counter change in subscribe()!')
  }
})
```

## 区别拓展

### Vuex 和 localStorage 的区别

1. localStorage 用于在浏览器端持久化存储少量数据，并且 localStorage 存储的数据是独立于应用程序的，不提供数据共享的机制，也没有响应式的状态管理能力。一般用来存储用户相关的数据，如登录信息、偏好设置等
2. Vuex 提供了一个集中式的、可预测的状态管理方案，是对 Vue 中多组件的共享状态进行集中式的管理。一般用来存储应用相关的信息，如路由状态、表单数据等

### Vuex 和 EventBus 的区别

与上述问题类似，EventBus 允许组件之间通过事件的发布和订阅来进行数据传递和通信，但它不提供状态管理的功能，并且不限制数据流动方向，适用于组件通信

## Vuex 实现思路

```js
class Store {
  constructor(options) {
    // 1. 接收数据，并将其转为响应式
    this.state = reactive(options.state || {})
    // 2. 接收其他操作
    this.mutations = options.mutations || {}
    this.actions = options.actions || {}
    this.getters = options.getters || {}
  }

  // 3. 定义修改数据的方法
  commit(type, payload) {
    this.options.mutations[type].call(this, this.state, payload)
  }

  // ...
}
```

## Vuex 缺点

1. ts 支持不友好
2. 代码相对冗杂，比如访问属性时是`store.state.xxx`，需要加上`state`，在不使用 mapState 时代码会很长
