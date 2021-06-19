/* eslint-disable no-console */
const myLog = process.env.NODE_ENV === "development" ? console.log : () => {};
const myErr = process.env.NODE_ENV === "development" ? console.error : () => {};
const myDebug =
  process.env.NODE_ENV === "development" ? console.debug : () => {};

export default {
  log: myLog,
  error: myErr,
  debug: myDebug,
  install(Vue) {
    Vue.prototype.$log = myLog;
    Vue.prototype.$error = myErr;
    Vue.prototype.$debug = myDebug;
  }
};
