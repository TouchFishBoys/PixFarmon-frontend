import Vue from "vue";
import VueEventBus from "vue-geventbus";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import "@/assets/style.scss";
import "@/assets/common.css";

Vue.use(VueEventBus);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  vuetify,
  render: h => h(App)
});
