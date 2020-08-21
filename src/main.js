import Vue from 'vue'
import VCharts from 'v-charts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VCharts)

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app')
