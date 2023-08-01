import { defineStore } from 'pinia'

/**
 * 创建 Store
 * 参数 1：容器的 ID，必须唯一。pinia 会把所有的容器挂载到根容器
 * 参数 2：选项对象
 */
export const useMainStore = defineStore('main', {
  /**
   * 共享的数据状态
   * 1. 必须是函数：为了避免在服务端渲染时交叉请求导致的数据状态污染
   * 2. 必须是箭头函数：为了更好的 ts 类型推导
   * 返回值是一个函数，调用得到容器实例
   */
  state: () => {
    return {
      msg: 'hello world',
      count: 100
    }
  },
  // 计算属性，用于从 state 派生出一些状态，有缓存的功能
  getters: {
    count10(state) {
      return state.count + 10
    }
  },
  // 修改状态的方法
  actions: {
    changeData() {
      this.msg = 'world',
        this.count++
    }
  }
})
