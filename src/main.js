import Vue from 'vue'
import Notifications from './lib/notifications/plugin'
import App from './App.vue'
import VueFormGenerator from "vue-form-generator";

Vue.config.productionTip = false
Vue.use(VueFormGenerator);
Vue.use(Notifications)
new Vue({
  render: h => h(App)
}).$mount('#app')
