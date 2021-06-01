// import dapp from "@/util/pixfarmon-dapp";
import myConsole from "@/util/my-console";

const mutations = {
  connect(state, address) {
    state.address = address;
  },
  login(state, address, username) {
    state.address = address;
    state.username = username;
  }
};

const actions = {
  connect({ commit }) {
    return new Promise((resolve, reject) => {
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(accounts => {
            const [account] = accounts;
            myConsole.log("Connected", account);
            commit("connect", account);
            resolve();
            // TODO 判断是否已注册，如果没有注册
          });
      } else {
        reject(new Error("No ethereum client found"));
      }
    });
  }
};

const getters = {
  isLogged: state => {
    return state.address !== "";
  }
};

export default {
  namespaced: true,
  state: () => ({
    address: ""
  }),
  mutations,
  actions,
  getters
};
