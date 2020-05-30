import Vue from 'vue'
import VueTelInput from "vue-tel-input";
import VueMobileDetection from "vue-mobile-detection";
import App from './App.vue'

Vue.use(VueTelInput);
Vue.use(VueMobileDetection);

new Vue({
  render: h => h(App),
}).$mount('#app')
