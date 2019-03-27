import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/page/login', component: () => import('@/components/login')},
    { path: '/page/sign', component: () => import('@/components/sign')},
    { path: '/page/404', component: () => import('@/components/404')},
    {
      path: '/',
      redirect: '/page/model_list',
      name: '首页',
    },
    {
      path: '/page/model_list',
      name: '模块列表',
      meta: { pname: '系统设置'},
      component: resolve => require(['@/components/model_list'], resolve)
    },
    {
      path: '/page/data_list',
      name: '数据列表',
      meta: { pname: '系统设置' },
      component: resolve => require(['@/components/data_list'], resolve)
    },
    {
      path: '/page/data_list_detail/:id',
      name: '数据列表字段',
      meta: { pname: '系统设置' },
      component: resolve => require(['@/components/data_list_detail'], resolve)
    },
    {
      path: '/page/model_list_fn',
      name: '模块功能',
      meta: { pname: '系统设置'},
      component: resolve => require(['@/components/model_list_fn'], resolve)
    },
    {
      path: '/page/user_list',
      name: '用户列表',
      meta: { pname: '系统设置'},
      component: resolve => require(['@/components/user_list'], resolve)
    },
    {
      path: '/page/power_list',
      name: '角色权限',
      meta: { pname: '系统设置' },
      component: resolve => require(['@/components/power_list'], resolve)
    },
    {
      path: '/page/role_class',
      name: '角色分类',
      meta: { pname: '系统设置' },
      component: resolve => require(['@/components/role_class'], resolve)
    },
    {
      path: '/page/file_list',
      name: '文件列表',
      meta: { pname: '系统设置' },
      component: resolve => require(['@/components/file_list'], resolve)
    },
    {
      path: '/page/record_list',
      name: '操作记录',
      meta: { pname: '系统设置' },
      component: resolve => require(['@/components/record_list'], resolve)
    },
    {
      path: '*',
      name: '404',
      meta: { pname: '系统设置'},
      component: resolve => require(['@/components/404'], resolve)
    }
  ]
})
