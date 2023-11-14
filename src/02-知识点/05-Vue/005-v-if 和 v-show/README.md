# v-if 和 v-show

## 区别

### 渲染上

1. v-if：控制是否在 DOM 中渲染元素实现显示与隐藏（性能消耗较大），false 时在文档流不占据位置
2. v-show：控制 display 的值来实现显示与隐藏，false 时在文档流占据位置

### 用法上

1. v-if：支持 template 标签
2. v-show：不支持 template 标签
3. 原因：template 标签是个虚拟 DOM，在 Vue 解析后并不会渲染在页面中，故 v-show 无法设置 template 的 display 值

## 用途

1. v-show 适用于需要频繁切换显隐状态，或者需要在隐藏时也能获得 DOM 元素的情况
1. v-if 与 echarts 配合使用时，即使条件成立也可能会导致 echarts 获取不到 DOM 元素，进而导致不渲染，因为 v-if 的渲染是异步的，此时虽条件成立但也可能会获取不到 DOM 元素
