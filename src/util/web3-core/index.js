import Web3 from "web3";
import Dapp from "../pixfarmon-dapp";

let web3Default;
let web3SKALE;

const getWeb3 = async () => {
  window.ethereum.autoRefreshOnNetworkChange = false;
  if (window.ethereum) {
    console.log("window.ethereum");
    web3Default = new Web3(window.ethereum);
    web3SKALE = new Web3(
      new Web3.providers.HttpProvider(process.env.VUE_APP_SKALE_CHAIN)
    );
  } else if (window.web3) {
    web3Default = new Web3(window.web3);
    web3SKALE = new Web3(
      new Web3.providers.HttpProvider(process.env.VUE_APP_SKALE_CHAIN)
    );
  } else {
    throw new Error("No wallet installed");
  }
  Dapp.updateWeb3(web3Default);
  return {
    web3Default,
    web3SKALE
  };
};

export default {
  install(Vue, options) {
    console.log(options);
    getWeb3();
    Vue.prototype.$web3 = getWeb3;
  },
  getWeb3
};
