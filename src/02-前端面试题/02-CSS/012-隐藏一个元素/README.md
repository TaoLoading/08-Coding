# 隐藏一个元素

## 方法

1. opacity: 0;
2. visibility: hidden;
3. display: none;

## 区别

1. 结构上
   1. opacity: 0。不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击
   2. visibility: hidden。不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击
   3. display: none。会让元素完全从渲染树中消失，渲染的时候不占据任何空间，不能点击
2. 继承上
   1. opacity: 0。非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示
   2. visibility: hidden。继承属性，子孙节点消失由于继承了 hidden，通过设置 visibility: visible;可以让子孙节点显示
   3. display: none。非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示
3. 性能上
   1. opacity: 0。导致重绘，性能消耗较大
   2. visibility: hidden。导致重绘，性能消耗较大
   3. display: none。导致回流，性能消耗较大