import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', component: () => import('@/components/login')},
    { path: '/sign', component: () => import('@/components/sign')},
    { path: '/404', component: () => import('@/components/404')},
    {
      path: '/',
      redirect: '/page/model_list',
      name: '首页',
    },
    {
      path: '/page/model_list',
      name: '模块列表',
      component: resolve => require(['@/components/model_list'], resolve)
    },
    {
      path: '/page/user_list',
      name: '用户列表',
      component: resolve => require(['@/components/user_list'], resolve)
    },
    {
      path: '*',
      name: '404',
      component: resolve => require(['@/components/404'], resolve)
    }
  ]
})
