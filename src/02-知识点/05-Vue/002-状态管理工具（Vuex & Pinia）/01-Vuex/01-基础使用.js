import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 共享的数据状态
    count: 0
  },
  mutations: {
    // 修改状态数据的方法
    increment(state) {
      state.count++
    }
  },
  actions: {
    // 异步操作或逻辑，可以触发 mutations 来修改状态
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  },
  getters: {
    // 计算属性，用于从 state 派生出一些状态
    getCount(state) {
      return state.count
    }
  }
})
