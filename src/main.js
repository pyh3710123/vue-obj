// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from 'vuex'
Vue.use(vuex)
var store = new vuex.Store({//store对象
  state:{
    count:1,
  },
  mutations:{
        add:function (state) {
         state.count+=1;
       },
        reduce:function(state){
           state.count-=1;
    },
    getUser:function (state,name){
          if(name.length>0) {
            localStorage.setItem('username',name);
          }
        },
    getPhone:function (state,phone){
        localStorage.setItem('phone',phone);
        window.location.reload()
    }
  },
})
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
