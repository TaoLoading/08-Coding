# v-model

## 原理

v-model 是一个语法糖，相当于:value 和@input 的结合

1. v-bind 绑定属性值
2. v-on 绑定 input 事件到监听函数，函数获取最新值再赋值带绑定的属性中

## 自定义 v-model

1. 指令方式。思路：监听值的变化并更新
2. 组件方式。思路：利用事件通信传值

## 为什么要自定义 v-model

1. 原生的 v-model 只适用于原生的表单输入元素（如 input、select、textarea）
2. 通过组件式自定义 v-model 可以更灵活的控制自定义组件的数据输入和输出
