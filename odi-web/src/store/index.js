import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      name: 'xx',
      menuRows: []
    },
    getters: {
      fn: function (state) { 
        //计算属性
        return state.name + "xx"
      }
    },
    mutations: {
      store_menuRows: function (state, params) {
        //绑定事件
        // console.log(params)
        state.menuRows = params
      }
    }
})

export default store
