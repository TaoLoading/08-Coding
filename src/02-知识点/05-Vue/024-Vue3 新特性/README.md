## Vue3 新特性

1. Composition API
2. setup 语法糖
3. Teleport 传送门：允许将子组件的内容传送到 DOM 的其他部分
4. Fragments 片段
5. Emits 组件选项：用于声明组件可以触发的自定义事件列表
6. 自定义渲染器 API：允许创建自己的渲染器，定制渲染的各个方面，包括如何创建和更新 DOM 元素，以及如何处理指令、属性等
7. Suspense（实验功能）：异步组件相关

## 解释部分新特性

1. Teleport 传送门：允许将子组件的内容传送到 DOM 的其他部分

   ```vue
   <template>
     <!-- 正常的内容 -->
     <h1>Hello World!</h1>
   
     <!-- 使用 Teleport，此处的内容被渲染到了 <body> 内 -->
     <Teleport to="body">
       <h1>Hello World!</h1>
     </Teleport>
   </template>
   ```

2. Emits 组件选项：用于声明组件可以触发的自定义事件列表。优点：

   1. 显式声明事件，便于代码阅读

   2. 可对事件进行校验

      ```ts
      emits: {
        'custom-event': (someData) => typeof someData === 'string' // 只有当 someData 是字符串时才有效
      }
      
      emit('custom-event', someData)
      ```

## Vue3 相比 Vue2 的优势

1. 更合理的代码逻辑组织
2. 更小的体积
3. 更好的 ts 支持
4. 优化了 diff 算法
5. 优化了编译器
6. 更多的新功能
