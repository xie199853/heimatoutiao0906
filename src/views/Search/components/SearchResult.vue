<template>
  <div class="result">
    <!-- 获取第一页和下一页的数据并渲染 -->
    <van-list
      v-model="loading"
      @load="getResults"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败请刷新"
    >
      <van-cell :title="item.title"
      v-for="item in results"
      :key="item.art_id"
      @click="
      $router.push({
        path: '/detail',
        query: {articleId: item.art_id}
      })">
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/Api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      perPage: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResults() {
      // 发送请求获取搜索结果
      try {
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        const { data } = await getResultsAPI(
          this.page++,
          this.perPage,
          this.keywords
        )
        const results = data.data.results
        if (results.length === 0) {
          this.finished = true
        }
        // 保存数据
        // this.results.push(...data.data.results)
        this.results = [...this.results, ...results]
      } catch (error) {
        this.error = true
      } finally {
        // 关闭loading
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
  // overlay和auto用法基本一致
.result {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
