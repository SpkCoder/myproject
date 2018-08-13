import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
//import testList from '@/components/testList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: resolve => require(['@/components/HelloWorld'], resolve)
    },
    {
      path: '/page/testList',
      name: 'testList',
      component: resolve => require(['@/components/testList'], resolve)
    },
    {
      path: '/page/userList',
      name: 'userList',
      component: resolve => require(['@/components/userList'], resolve)
    }
  ]
})
