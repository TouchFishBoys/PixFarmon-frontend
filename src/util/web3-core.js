import Web3 from "web3";
import Dapp from "./pixfarmon-dapp";
import myConsole from "./my-console";

let web3Default;
let web3SKALE;

const getWeb3 = async () => {
  window.ethereum.autoRefreshOnNetworkChange = false;
  if (typeof window.ethereum !== "undefined") {
    myConsole.log("using window.ethereum");
    web3Default = new Web3(window.ethereum);
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
  install(Vue) {
    getWeb3();
    Vue.prototype.$web3 = getWeb3;
  },
  getWeb3
};
