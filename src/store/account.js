import dapp from "@/util/pixfarmon-dapp";

const mutations = {
  login(state, address) {
    console.log("logging in");
    if (dapp.repositoryContract) {
      console.log(dapp.repositoryContract);
      dapp.repositoryContract.methods
        .getUsername(address)
        .call({
          from: address
        })
        .then(result => {
          console.log(result);
          state.address = address;
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("missing contract");
    }
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

export default {
  namespaced: true,
  state: () => ({
    username: "",
    address: ""
  }),
  mutations
};
