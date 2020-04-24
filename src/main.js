import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import wb from "./registerServiceWorker";
import vuetify from './plugins/vuetify';
import GAuth from 'vue-google-oauth2'
import 'roboto-fontface/css/roboto/roboto-fontface.css'

const gauthOption = {
  clientId: '1066672044655-3a889t7qbtmm8cr011f89ubkne74plsu.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

Vue.prototype.$workbox = wb;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
