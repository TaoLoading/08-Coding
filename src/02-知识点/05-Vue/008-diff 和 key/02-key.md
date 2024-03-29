# key

## key 的作用

1. 在 diff 算法中 key 是标识，用于判断两个节点是否为同一个节点（key 相同、标签元素相同），从而更高效的更新虚拟 DOM
2. 在过渡效果中 key 也是起标识作用，如果不设置 key 则 Vue 将无法正确地跟踪和管理元素的状态变化，导致不会产生动画效果
3. 如果不设置 key 可能在列表更新时引发一些隐藏的 bug 比如说更新和不更新看不出来

## 使用 index 作为 key 会有什么问题

1. 性能问题。当操作列表数据时 index 容易发生变化，而 Vue 本身通过 key 识别哪些元素需要更新，使得 Vue 无法确定组件对应的新数据列表，导致需要重新渲染组件，影响性能
2. 状态问题。当列表中有包含有状态的组件（如表单输入）时，可能会造成渲染错误
