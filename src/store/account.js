import dapp from "@/util/pixfarmon-dapp";

const mutations = {
  login(state, address, username) {
    state.address = address;
    state.username = username;
  },
  register(state, address, username) {
    if (dapp.pixfarmonContract) {
      dapp.pixfarmonContract.methods
        .register(username)
        .call({
          from: address
        })
        .then(() => {
          console.log("Register success");
          state.username = username;
        })
        .catch(error => {
          console.log("Register failed", error);
        });
    }
  },
  logout(state) {
    state.username = "";
    state.address = "";
  }
};

const actions = {
  login({ commit }, address) {
    console.log("logging in");
    if (dapp.repositoryContract) {
      console.log(dapp.repositoryContract);
      dapp.repositoryContract.methods
        .getUsername(address)
        .call({
          from: address
        })
        .then(username => {
          console.log(username);
          commit("login", address, username);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("missing contract");
    }
  }
};

export default {
  namespaced: true,
  state: () => ({
    username: "",
    address: "0x6d80aAC61F6d92c7F4A3c412850474ba963B698E"
  }),
  mutations,
  actions
};
