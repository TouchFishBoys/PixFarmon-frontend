import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import util from "./util";

Vue.use(util.web3Core);

console.log(process.env.VUE_APP_SKALE_CHAIN);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  vuetify,
  render: h => h(App)
});
