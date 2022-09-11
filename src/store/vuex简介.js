import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 声明一个变量放到vuex
// vuex声明的变量
// - state里声明
// - 取： $store.state.变量名

// VueX修改数据
// - 自产自销
// - 规范：函数命名采用大驼峰
// - mutations：函数
// - mutations：里面的函数
// - state: 数据
// - payload: 载荷，触发mutations的参数

// - 触发mutations里面的方法
// - this.$store.commit('mutations方法名字',参数)

// getters --> 相当于computed计算属性
// getters的函数 第一个参数是state
export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    bigNum(state) {
      return state.count * 10
    }
  },
  mutations: {
    SET_COUNT(state, payload) {
      state.count += payload
    }
  }
})
