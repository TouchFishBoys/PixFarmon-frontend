import Vue from 'vue';
import App from './App';
import router from './router';
import {store} from './store/';
import vuetify from './plugins/vuetify';

Vue.use(Button);
Vue.use(List);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  render: (h) => h(App),
});
