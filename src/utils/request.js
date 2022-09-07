import axios from 'axios'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})
// const request = axios.create() 克隆axios
export default request
