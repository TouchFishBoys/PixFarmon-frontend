import dapp from "@/util/pixfarmon-dapp";
import account from "./account";

const mutations = {
  updateSeeds(state, seeds) {
    state.seeds = seeds;
  }
};

const actions = {
  updateSeeds({ commit }) {
    return new Promise((resolve, reject) => {
      dapp.repository.getItemList(
        account.state.address,
        {
          type: 0,
          user: account.state.address,
          target: account.state.address
        },
        (error, seeds) => {
          if (error) {
            reject(error);
          } else {
            commit("updateSeeds", seeds);
            resolve(seeds);
          }
        }
      );
    });
  }
};

export default {
  namespaced: true,
  state: () => ({
    seeds: []
  }),
  actions,
  mutations
};
