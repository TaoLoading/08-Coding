# 父子生命周期顺序

## 创建与挂载

### 顺序

创建过程自上而下，挂载过程自下而上，即：

1. 父 created
2. 子 created
3. 子 mounted
4. 父 mounted

### 原因

1. Vue 创建过程是一个递归过程，先创建父组件，有子组件就会创建子组件，所以先父 created，再子 created
2. 子组件首次创建时会添加 mounted 钩子到队列，等到 patch 结束再执行它们，可见子组件的 mounted 钩子是先进入到队列中的，因此等到 patch 结束执行这些钩子时也先执行。先挂载子组件再挂载父组件的优点：
   1. 避免空数据传递。如果父组件在挂载时尝试传递数据给子组件，而子组件还未挂载，可能会导致子组件收到空的数据
   2. 减少重绘重排次数。如果父组件在挂载后再挂载子组件，可能会导致两次 DOM 更新和重绘

## 更新

### 顺序

1. 父 beforeUpdate
2. 子 beforeUpdate
3. 子 updated
4. 父 updated

## 销毁

### 顺序

1. 父 beforeDestroy
2. 子 beforeDestroy
3. 子 destroyed
4. 父 destroyed
