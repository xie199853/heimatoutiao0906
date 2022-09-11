// user .js 划分是跟后端接口文档
import request from '@/utils/request'
import store from '@/store'
/**
 * @param {string} mobile  手机号
 * @param {number}} code  验证码
 * @returns Promise
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 * @param {string} mobile 手机号
 * @returns Promise
 */
export const sendCodeApi = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.tokenObj.token}`
    }
  })
}
