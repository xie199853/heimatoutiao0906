<template>
  <div>
    <span class="toutiao toutiao-gengduo"></span>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div class="box"></div>
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
