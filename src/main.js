import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import wb from "./registerServiceWorker";
import vuetify from './plugins/vuetify';
import VueAnalytics from 'vue-analytics';
import 'roboto-fontface/css/roboto/roboto-fontface.css'

Vue.prototype.$workbox = wb;
Vue.config.productionTip = false;
Vue.use(VueAnalytics, {
  id: 'G-674VYCVM4S',
  checkDuplicatedScript: true,
  router
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
