import dapp from "@/util/pixfarmon-dapp";

const mutations = {
  login(state, address) {
    console.log("logging in");
    if (dapp.repositoryContract) {
      console.log(dapp.repositoryContract);
      dapp.repositoryContract.methods
        .addressToName(address)
        .call({
          from: address
        })
        .then(result => {
          console.log(result);
          state.account = address;
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("missing contract");
    }
  },
  logout(state) {
    state.account.address = "";
    state.account.username = "";
  }
};

export default {
  namespaced: true,
  state: () => ({
    account: {
      username: "",
      address: ""
    }
  }),
  mutations
};
