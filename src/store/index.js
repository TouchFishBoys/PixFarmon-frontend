import Vue from "vue";
import Vuex from "vuex";
import account from "./account";
import repository from "./repository";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account,
    repository
  },
  strict: true,
  mutations: {},
  actions: {}
});
