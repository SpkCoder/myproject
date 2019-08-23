// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';

import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/font-awesome.css';
import './assets/css/style.css';

import axiosHttp from './common/axiosHttp'
Vue.prototype.$axiosHttp = axiosHttp

Vue.use(ElementUI);
Vue.use(VueResource);

Vue.config.productionTip = false;
Vue.prototype.GLOBAL = {
  // host: "http://127.0.0.1:4000",
  host: ""
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});


