<template>
  <div>
    <article-item v-for="item in articles"
    :key="item.id"
    :arcicle="item"></article-item>
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
      articles: []
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
    }
  }
}
</script>

<style></style>
