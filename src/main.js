import Vue from 'vue';
import App from './App';
import router from './router';
import {store} from './store/';
import {Button} from 'ant-design-vue';

Vue.use(Button);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
