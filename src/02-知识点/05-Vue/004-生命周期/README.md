# 生命周期

## 概念

Vue 组件从创建到销毁的过程叫做 Vue 的生命周期

## 生命周期

| Vue2          | Vue3（option API）                          | 描述                                     |
| ------------- | ------------------------------------------- | ---------------------------------------- |
| beforeCreate  | beforeCreate（生命周期钩子中被 setup 代替） | 组件实例被创建之前                       |
| created       | created（生命周期钩子中被 setup 代替）      | 组件实例已经完全创建                     |
| beforeMount   | beforeMount                                 | 组件挂载之前                             |
| mounted       | mounted                                     | 组件挂载到实例上去之后                   |
| beforeUpdate  | beforeUpdate                                | 组件数据发生变化，更新之前               |
| updated       | updated                                     | 数据数据更新之后                         |
| beforeDestroy | beforeUnmount                               | 组件实例销毁之前                         |
| destroyed     | unmounted                                   | 组件实例销毁之后                         |
| activated     | activated                                   | keep-alive 缓存的组件激活时              |
| deactivated   | deactivated                                 | keep-alive 缓存的组件停用时调用          |
| errorCaptured | errorCaptured                               | 捕获一个来自子孙组件的错误时被调用       |
| -             | renderTracked                               | 调试钩子，响应式依赖被收集时调用         |
| -             | renderTriggered                             | 调试钩子，响应式依赖被触发时调用         |
| -             | serverPrefetch                              | ssr only，组件实例在服务器上被渲染前调用 |

## Vue2 与 Vue3 生命周期钩子变化对比

1. beforeCreate -> use setup()
2. created() -> use setup()
3. beforeMount() -> onBeforeMount()
4. mounted() -> onMounted()
5. beforeUpdate() -> onBeforeUpdate()
6. updated() -> onUpdated()
7. beforeDestroy() -> onBeforeUnmount()
8. destroyed() -> onUnmounted()
9. setup 继承了 beforeCreate() 和 created()

## 结合实践

1. beforeCreate：用于组件开发中执行一些初始化任务
2. created：组件初始化完毕，可以获取不与 DOM 交互的数据
3. mounted：DOM 已创建，可以获取数据和 DOM 元素；访问子组件等
4. beforeUpdate：此时 view 层还未更新，可用于获取更新前各种状态
5. updated：完成 view 层的更新，更新后，所有状态已是最新
6. beforeUnmount：实例被销毁前调用，可用于一些定时器或订阅的取消
7. unmounted：销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器
