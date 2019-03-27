import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/sign', component: () => import('@/views/sign/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'Home',
    hidden: true,
    children: [{
      path: 'home',
      component: () => import('@/views/home/index')
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'User',
    meta: { title: 'User', icon: 'user' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/user/list'),
        meta: { title: 'List', icon: 'arrow-right' }
      }
    ]
  },

  {
    path: '/device',
    component: Layout,
    redirect: '/device/list',
    name: 'Device',
    meta: { title: 'Device', icon: 'link' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/device/list'),
        meta: { title: 'List', icon: 'arrow-right' }
      },
      {
        path: 'check/:id',
        name: 'Check',
        hidden: true,
        component: () => import('@/views/device/check'),
        meta: { title: 'Check', icon: 'arrow-right' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
