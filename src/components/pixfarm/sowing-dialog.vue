<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <!-- 背包 -->
    <v-card>
      <v-card-title>
        Choose your seed to plant
      </v-card-title>

      <repository class="mx-4"></repository>

      <v-card-actions>
        <v-spacer> </v-spacer>
        <v-btn @click="dialog = false"> close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
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
