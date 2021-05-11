import dapp from "@/util/pixfarmon-dapp";

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
  // Only update
  connect({ commit }) {
    return new Promise((resolve, reject) => {
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(accounts => {
            const [account] = accounts;
            console.log("Connected", account);
            commit("connect", account);
            resolve();
          });
      } else {
        reject();
      }
    });
  },
  // Should make isLogged to be true
  login({ commit, state }) {
    const [address] = state;
    console.log("logging in");
    dapp.account.login(address, (error, username) => {
      if (!error) {
        commit("login", address, username);
      } else {
        console.log("Error when login", error);
      }
    });
  },
  // Register account, if success, login
  register({ commit }, address, username) {
    dapp.account.register(address, { username }, error => {
      if (error) {
        console.log("Error when register", error);
      } else {
        console.log("Register success");
        commit("login", address, username);
      }
    });
  }
};

const getters = {
  isLogged: state => {
    return state.username !== null;
  }
};

export default {
  namespaced: true,
  state: () => ({
    username: "",
    address: "0x6d80aAC61F6d92c7F4A3c412850474ba963B698E"
  }),
  mutations,
  actions,
  getters
};
