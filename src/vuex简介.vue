<template>
  <div>
   <!-- <router-view></router-view> -->
   <h1>{{count}}</h1>
   <h1>count的10倍：{{bigNum}}</h1>
   <button @click="SET_COUNT(10)">d点击count++</button>
  </div>
</template>

<script>
// mapGetters--> 将vuex里面getters映射到computed
// mapMutations-->将vuex的mutations方法映射到methods
import { mapState, mapGetters, mapMutations } from 'vuex'

// yarn add -D postcss-pxtorem （供post-css使用,建立.postcssrc.js文件夹）
export default {
  methods: {
    // increment() {
    //   this.$store.commit('SET_COUNT', 10)
    // },
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped>
.box {
  width: 2rem;
  height: 2rem;
  background-color: pink;
}
</style>
