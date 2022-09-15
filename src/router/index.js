import Vue from 'vue'
import VueRouter from 'vue-router'
// import login from '@/views/login'
Vue.use(VueRouter)
// SPA
// 首屏加载速度很慢
// 路由懒加载
// - 使用路由页面，再去请求

// 懒加载的chunk 默认的名字是模块的路径
// webpack魔法注释： /* wbpackChunkName： "新名字" */
const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import(/* wbpackChunkName:"base" */ '@/views/Video')
      },
      {
        path: '/qa',
        component: () => import(/* wbpackChunkName:"base" */ '@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* wbpackChunkName:"Search" */'@/views/Search')
  }
]

const router = new VueRouter({
  routes
})

export default router
