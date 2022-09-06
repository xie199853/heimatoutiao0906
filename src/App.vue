<template>
  <div>
   <router-view></router-view>
  </div>
</template>

<script>
// rem 适配
// 1、 yarn add amfe-flexible
// 2、盒子使用rem单位
// 3、自动识别css中的px，并处理rem
// post-css 预处理器
// yarn add -D postcss-pxtorem （供post-css使用,建立.postcssrc.js文件夹）
export default {}
</script>

<style scoped>
.box {
  width: 2rem;
  height: 2rem;
  background-color: pink;
}
</style>
