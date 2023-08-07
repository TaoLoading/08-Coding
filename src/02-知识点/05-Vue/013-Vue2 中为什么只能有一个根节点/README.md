# Vue2 中为什么只能有一个根节点

## 原因

Vue2 中使用了虚拟 DOM，而虚拟 DOM 是一个树状结构，要求只有一个根节点

## Vue3 支持多个根节点

Vue3 引入了 Fragment（片段）的概念，这是一个抽象的节点。在处理多根节点的组件时会创建一个 Fragment 节点，把多个根节点作为它的 children，在 diff 算法时直接处理 children。Fragment 的引入减少了不必要的 DOM，提高了渲染性能
