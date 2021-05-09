import Web3 from "web3";

let web3;

export default {
  install(Vue, options) {
    console.log(options);
    if (!web3) {
      if (typeof window.ethereum !== "undefined") {
        console.log("A wallet is installed");
        web3 = new Web3(window.ethereum);
      } else {
        web3 = new Web3();
      }
      window.ethereum.autoRefreshOnNetworkChange = false;
    }
    console.log("Install web3", web3);
    Vue.prototype.$web3 = web3;
  },
  getWeb3: () => web3
};
