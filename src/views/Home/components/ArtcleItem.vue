<template>
  <div>
    <!-- 没有图片的 -->
    <van-cell
      v-if="arcicle.cover.type === 0"
      :title="arcicle.title"
      :label="label"
    />
    <!-- 一张图片 -->
    <van-cell
      v-else-if="arcicle.cover.type === 1"
      :title="arcicle.title"
      :label="label">
      <van-image
  width="100"
  height="100"
  :src="arcicle.cover.images[0]"
/>
    </van-cell>
    <!-- 三张图片 -->
    <van-cell v-else
    :title="arcicle.title"
      :label="label">
      <template #label>
        <van-image
      v-for="(item,index) in arcicle.cover.images" :key="index"
  width="100"
  height="100"
  :src="item"
/>
<p>{{label}}</p>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/day.js'
export default {
  props: {
    arcicle: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      /* eslint-disable*/
      const { aut_name, comm_count, pubdate } = this.arcicle;
      return `${aut_name} ${comm_count}评论 ${dayjs(pubdate).fromNow()}`;
    },
  },
};
</script>

<style>
</style>
