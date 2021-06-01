<template>
  <v-sheet> </v-sheet>
</template>

<script>
import dapp from "@/util/pixfarmon-dapp";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("account", {
      address: state => state.address
    })
  },
  data() {
    return {
      friendList: [
        {
          displayName: "Kerite",
          address: "0x0Be56dA49ef47de7061390120E97fFAAFc92505B"
        }
      ]
    };
  },
  methods: {
    loadFriends() {
      dapp.friend.getFriendList(this.address, (error, friends) => {
        if (error) {
          this.$error("ERROR loading friend");
        } else {
          this.$log(friends);
        }
      });
    }
  }
};
</script>

<style scoped>
.friend-panel-container {
  position: absolute;
}
</style>
