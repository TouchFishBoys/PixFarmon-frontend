<template>
  <v-dialog v-model="dialog" persistent width="430">
    <!-- 背包 -->
    <v-card>
      <v-card-title>
        Choose your seed to plant
      </v-card-title>

      <Repository class="mx-4" @selected="doSowing"></Repository>

      <v-card-actions>
        <v-spacer> </v-spacer>
        <v-btn color="primary" @click="dialog = false"> close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Dapp from "@/util/pixfarmon-dapp";
import { mapState } from "vuex";
import { indexToCoor } from "@/util";
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
      this.$debug(item, this.field);
      const { x, y } = indexToCoor(this.field);
      this.$log(x, y);
      const { itemTag } = item;
      Dapp.field.sowing(this.address, { x, y, seedTag: itemTag }, error => {
        if (error) {
          this.$error(error);
        } else {
          this.$log("Success");
        }
      });
    },
    updateRepository() {
      Dapp.repository.getItemList(
        this.address,
        { type: 0, user: this.address, target: this.address },
        (err, list) => {
          if (err) {
            this.$error(err);
          } else {
            this.$log(list);
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
