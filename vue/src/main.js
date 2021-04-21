import Vue from 'vue'
import VueMobileDetection from "vue-mobile-detection";
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';

Vue.use(VueMobileDetection);
Vue.use(VueTelInputVuetify, {vuetify,});

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
