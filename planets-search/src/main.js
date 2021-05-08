import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Antd from 'ant-design-vue';
import router from './router'
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false
Vue.use(store)
Vue.use(router)
Vue.use(Antd);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
