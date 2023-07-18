# 虚拟列表

## 介绍

1. 定义：虚拟列表（Virtual List）是一种优化技术，用于处理长列表或大数据集的渲染问题
2. 解决的问题：当前端需要展示大量数据时，传统的渲染方式可能会导致性能问题，因为将所有数据同时渲染到 DOM 中可能会导致页面卡顿或加载缓慢
3. 思路：并不是对全部数据进行渲染，而是在处理滚动时，只对特定（出现在可视区域内）数据进行渲染，并通过设置偏移量将渲染的数据移动到可视区域内

## 实现思路

1. 通过固定元素高度计算需要渲染的元素数量

   ```js
   visibleCount() {
     return Math.ceil(this.screenHeight / this.itemSize)
   }
   ```

2. 计算全部数据的高度。与实现滚动条有关

   ```js
   listHeight() {
     return this.listData.length * this.itemSize
   }
   ```

3. 通过起始与终止索引计算需要渲染的数据

   ```js
   visibleData() {
     return this.listData.slice(this.start, Math.min(this.end, this.listData.length))
   }
   ```

4. 计算偏移量。即将需要渲染的数据移动到可视区域内

   ```js
   getTransform() {
     return `translate3d(0, ${this.startOffset}px, 0)`
   }
   ```

5. 定义滚动时触发的方法，更新起始和终止索引，以及偏移量

   ```js
   scrollEvent() {
     // 滚动位置。即滚动条相对于可视区域顶部的距离
     let scrollTop = this.$refs.list.scrollTop
     // 所渲染元素的开始索引
     this.start = Math.floor(scrollTop / this.itemSize)
     // 所渲染元素的结束索引
     this.end = this.start + this.visibleCount
     // 偏移量
     this.startOffset = scrollTop - (scrollTop % this.itemSize)
   }
   ```

6. 布局 html

   ```html
   <div id="app">
     <div ref="list" class="infinite-list-container" @scroll="scrollEvent($event)">
       <!-- 占位元素，用于撑开高度出现滚动条 -->
       <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
       <!-- 用于渲染数据的元素 -->
       <div class="infinite-list" :style="{ transform: getTransform }">
         <div ref="items" class="infinite-list-item" v-for="item in visibleData" :key="item.id"
           :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }">{{ item.value }}</div>
       </div>
     </div>
   </div>
   ```

## 解决行高未知的情况

1. 设置默认的列表项高度：使用默认高度对虚拟列表进行初步渲染
2. 动态计算行高：在页面加载完成后计算每个列表项的实际高度
3. 重新渲染：依据实际行高重新计算所需元素并渲染
