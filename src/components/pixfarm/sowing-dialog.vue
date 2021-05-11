<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <!-- 背包 -->
    <v-card>
      <v-card-title>
        Choose your seed to plant
      </v-card-title>

      <repository class="mx-4" @selected="doSowing"></repository>

      <v-card-actions>
        <v-spacer> </v-spacer>
        <v-btn @click="dialog = false"> close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Dapp from "@/util/pixfarmon-dapp";
import { mapState } from "vuex";
import Repository from "../repository.vue";

export default {
  components: { Repository },
  data() {
    return {
      dialog: false,
      field: -1,
      repository: []
    };
  },
  methods: {
    sowing(fieldIndex) {
      this.field = fieldIndex;
      this.dialog = true;
    },
    doSowing(item) {
      const { x, y } = this.$i2xy(this.field);
      const { itemTag } = item;
      Dapp.field.sowing(this.address, { x, y, itemTag }, error => {
        if (error) {
          console.log(error);
        } else {
          console.log("SUccess");
        }
      });
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
