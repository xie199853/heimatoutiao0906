import request from '@/utils/request'
/**
 *获取文章
 * @param {string | number} id 频道的id
 * @param {number} timestamp 请求新的推荐数据传当前的时间戳 请求历史时间戳
 * @returns
 */
export const getArticlesAPI = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
