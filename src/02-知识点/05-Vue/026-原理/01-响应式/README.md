# 响应式

## Vue2

### 实现原理

Vue 2 使用 Object.defineProperty 实现响应式。具体过程如下：

1. **数据劫持**：当 Vue 实例被创建时，Vue 会遍历数据对象的每个属性，使用 Object.defineProperty() 将它们转换为 getter 和 setter，这样 Vue 就能捕获到属性的读取和修改
2. **依赖收集**：当对属性进行读取操作时会触发 getter 函数，Vue 会通过 getter 来进行依赖收集，会将当前属性对应的 Watcher 对象（用于建立视图和数据之间联系的桥梁）放入依赖收集器中，这样可以记录所有依赖于该属性的组件
3. **派发更新**：当对属性进行修改操作时会触发 setter 函数，Vue 会遍历依赖收集器并通知其中的 Watcher 对象，以触发相应的更新操作
4. **注**：如果是数组，则覆盖数组的 7 个变更方法实现变更通知

### 缺点

1. 初始化时需要遍历对象所有 key，如果对象层级较深，性能不好
2. 通知更新过程需要维护大量 dep 实例和 watcher 实例，额外占用内存较多
3. Object.defineProperty 只能劫持已经存在的属性，无法直接监听属性的添加或删除
4. 不支持新的 Map、Set 等数据结构

## Vue3

### 实现原理

Vue 3 使用 Proxy 实现响应式，解决了使用 Object.defineProperty 的缺点
