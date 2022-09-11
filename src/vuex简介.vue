<template>
  <div>
    <!-- <router-view></router-view> -->
    <!-- 展示count -->
    <h1>{{ count }}</h1>
    <h1>10倍 {{ bigNum }}</h1>
    <button @click="SET_COUNT(10)">+1</button>
  </div>
</template>

<script>
// mapState  --> 将vuex里面state映射到computed
// 使用
// - 引入mapState：函数，返回一个对象
// - 参数：['映射属性']

// mapGetters  --> 将vuex里面state映射到computed

// mapMutations --> 将vuex里面state映射到methods

import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    // increment() {
    //   this.$store.commit('SET_COUNT', 10)
    // }
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 700px;
  height: 88px;
  background: skyblue;
}
</style>
