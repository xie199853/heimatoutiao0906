// 下载 引入  配置axios
import axios from 'axios'
import store from '@/store'
// const request = axios.create() 克隆axios
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})

// 添加请求拦截器： 请求做些事
// config 是每一次请求的配置对象
// 必须返回 config
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么

    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }
    return config // 必须返回
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default request
