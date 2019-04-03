import Vue from 'vue'
import Router from 'vue-router'
import url from './routerUrl';
Vue.use(Router)

var routesArr = [
    {
      path: '/',
      redirect: '/page/model_list',
      name: '首页',
    },
    {
      path: '/page/login',
      name: '登录',
      component: () => import('@/components/login')
    },
    {
      path: '/page/404',
      name: '404',
      component: () => import('@/components/404')
    }
];
url.routerUrl.forEach(function (item,index) {
    routesArr.push({path: item, name: '', meta: { pname: ''}, component: resolve => require(['@/components/' + item.split('/')[2]], resolve)});
});
routesArr.push({path: '*', name: '404', meta: { pname: '系统设置'}, component: resolve => require(['@/components/404'], resolve)});

export default new Router({
  routes: routesArr
})
