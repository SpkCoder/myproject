import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
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
    }
  ]
})
