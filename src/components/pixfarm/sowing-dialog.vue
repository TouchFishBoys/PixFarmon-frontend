<template>
  <v-dialog v-model="dialog">
    <!-- 背包 -->
    <v-card> </v-card>
  </v-dialog>
</template>

<script>
import Dapp from "@/util/pixfarmon-dapp";
import { mapState } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      field: -1
    };
  },
  methods: {
    sowing(fieldIndex) {
      this.field = fieldIndex;
      this.dialog = true;
      Dapp.repository.getItemList(
        this.address,
        {
          type: 1,
          user: this.address,
          target: this.address
        },
        (error, items) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Get items:", items);
          }
        }
      );
    }
  },
  computed: {
    ...mapState("account", {
      address: state => state.address
    })
  }
};
</script>

<style></style>
