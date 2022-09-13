<template>
  <div class="article">
    <!-- 属性 -->
    <!-- @load:触底触发load事件 -->
    <!-- offset: 滚动条和底部距离多少的时候触发load事件，默认值是300px -->
    <!-- immediate-check: 初渲染的时候是否执行load事件，默认值是true -->
    <!-- v-model="loading" -->
    <!-- loading为true，Load事件不会触发 -->
    <!-- loading为false，Load事件会触发 -->
    <!-- loading会在load事件执行后，被van-list组件自动设置为ture 需要手动设置false-->
    <!-- finished:Boolean  false:load事件会被触发 true:load事件不会被触发，并且显示finished-text的文本-->
   <van-pull-refresh v-model="refreshLoding" @refresh="getNextPage">
    <van-list v-model="loading" @load="getNextPage" offset="100" :immediate-check="false" :finished="finished"
      finished-text="没有更多文章了" :error.sync="error" error-text="加载失败点击重新加载">
      <article-item v-for="item in articles" :key="item.id" :arcicle="item"></article-item>
    </van-list>
   </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesAPI } from '@/Api'
import ArticleItem from './ArtcleItem.vue'
// 发送请求，获取文章数据
export default {
  name: 'ArtcleList',
  components: { ArticleItem },
  props: {
    id: [String, Number]
  },

  data() {
    return {
      articles: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshLoding: false
    }
  },
  created() {
    this.getArticles()
  },
  methods: {
    async getArticles() {
      try {
        const { data } = await getArticlesAPI(this.id, +new Date())
        this.articles = data.data.results
        console.log(data)
        // 保存下一页的时间戳用于分页
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        const status = error.response?.status
        if (!error.response || error.response?.status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPage() {
      // if (Math.random() < 0.5) {
      //   throw new Error()
      // }
      try {
        // 1.发送请求
        const { data } = await getArticlesAPI(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 如果是下滑加载，将数据放在最后
        // 如果是下拉加载，将数据放在最前
        // 2.添加到articles
        if (this.loading) {
          this.articles.push(...data.data.results)
        } else {
          this.articles.unshift(...data.data.results)
        }
        // 3.更新时间戳
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // finally语句里的一定会执行
        // 4.更改loading
        this.loading = false
        this.refreshLoding = false
      }
    }
  }
}
</script>

<style scoped lang="less">
// 如何给盒子拥有子的滚动条
// 1. 定高
// 2. overflow: auto/scroll/
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
}
// &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
</style>>
