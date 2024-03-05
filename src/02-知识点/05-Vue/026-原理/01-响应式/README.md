# 响应式

## Vue2

### 实现原理

Vue 2 使用 Object.defineProperty 实现响应式。具体过程如下：

1. **数据劫持**：当 Vue 实例被创建时，Vue 会遍历数据对象的每个属性，使用 Object.defineProperty() 将它们转换为 getter 和 setter，这样 Vue 就能捕获到属性的读取和修改
2. **依赖收集**：当对属性进行读取操作时会触发 getter 函数，Vue 会通过 getter 来进行依赖收集，会将当前属性对应的 Watcher 对象（用于建立视图和数据之间联系的桥梁）放入依赖收集器中，这样可以记录所有依赖于该属性的组件
3. **派发更新**：当对属性进行修改操作时会触发 setter 函数，Vue 会遍历依赖收集器并通知其中的 Watcher 对象，以触发相应的更新操作

### 缺点

1. Object.defineProperty 只能劫持已经存在的属性，无法直接监听属性的添加或删除（使用 Vue.set 和 Vue.delete 实现）
2. 初始化时需要遍历对象所有 key，如果对象层级较深，性能不好（Vue3 采用惰性代理的形式，初始化时不转换，只有在属性被使用了进行转换）
3. 通知更新过程需要维护大量 dep 实例和 watcher 实例，额外占用内存较多
4. 不直接支持 Array、Map、Set 等数据结构（如果是数组，则覆盖数组的 7 个变更方法实现变更通知）

## 代码演示

```js
function defineReactive(obj, key, val) {
  // 递归子属性，确保所有深层属性也是响应式的
  if (typeof val === 'object') {
    reactive(val)
  }

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log(`读取 ${key}，触发 getter`)
      // 这里可以进行依赖收集
      return val
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return
      console.log(`修改 ${key}，触发 setter`)
      val = newVal
      // 这里可以进行派发更新
    }
  })
}

function reactive(obj) {
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
  return obj
}

const obj = reactive({ a: 1 })

console.log(obj.a)
obj.a = 2
```

## Vue3

### 实现原理

Vue 3 使用 Proxy 实现响应式，同样分为代理、依赖收集、派发更新，解决了 Object.defineProperty 的缺点。Proxy 是代理整个对象实现响应式，而 Object.defineProperty 是劫持对象的属性实现响应式

## 代码演示

```js
function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      // 这里可以进行依赖收集
      console.log(`读取 ${key}，触发 getter`)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      // 这里可以进行派发更新
      console.log(`修改 ${key}，触发 setter`)
      return Reflect.set(target, key, value, receiver)
    }
  }

  return new Proxy(target, handler)
}

const obj = reactive({ a: 1 })

console.log(obj.a)
obj.a = 2
```

