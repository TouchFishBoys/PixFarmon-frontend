import Vue from "vue";
import VueEventBus from "vue-geventbus";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import util from "./util";

Vue.use(util.web3Core);
Vue.use(VueEventBus);
Vue.prototype.$group = (array, subGroupLength) => {
  let index = 0;
  const newArray = [];

  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)));
  }

  return newArray;
};
Vue.prototype.$xy2i = (x, y) => {
  return x * 6 + y;
};
Vue.prototype.$i2xy = index => {
  const x = Math.floor(index / 6);
  const y = Math.floor(index % 6);
  return { x, y };
};

console.log(process.env.VUE_APP_SKALE_CHAIN);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  vuetify,
  render: h => h(App)
});
