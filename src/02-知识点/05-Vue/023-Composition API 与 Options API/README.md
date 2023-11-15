# Composition API 与 Options API

1. Composition API 与 Options API 是 Vue 中组件声明的两种编写方式，Composition API 包括 Reactivity API、生命周期钩子、依赖注入等，使用户可以通过函数方式编写组件；Options API 则是通过选项的对象方式编写组件
2. Composition API 具有更好的代码逻辑组织，同一部分逻辑代码可以放到一块，无需再像 Options API 中拆分到多个选项，降低了维护成本
3. Composition API 通过加入 hook，解决了 Mixin 的缺点（命名冲突、属性覆盖、难以追踪来源、维护困难）
4. Composition API 具有更好的类型支持，对 ts 更为友好
