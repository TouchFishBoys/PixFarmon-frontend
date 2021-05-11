<template>
  <v-sheet height="200" :loading="loading" :disabled="loading">
    <v-row>
      <v-spacer></v-spacer>
      <v-btn icon fab dark small color="primary" @click="loadItems">
        <v-icon dark>
          mdi-refresh
        </v-icon>
      </v-btn>
    </v-row>

    <v-row
      v-for="(itemCol, rowIndex) in repository"
      :key="`item-row-${rowIndex}`"
    >
      <v-col
        v-for="(item, colIndex) in itemCol"
        :key="`item-${rowIndex}-${colIndex}`"
      >
        <img @click="itemSelected(rowIndex, colIndex)" />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import Dapp from "@/util/pixfarmon-dapp";
import { mapState } from "vuex";

export default {
  props: {
    colCount: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      repository: [],
      loading: false
    };
  },
  computed: {
    ...mapState("account", {
      address: state => state.address
    })
  },
  methods: {
    itemSelected(rowIndex, colIndex, itemTag) {
      this.$emit("selected", rowIndex, colIndex, itemTag);
    },
    loadItems() {
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
            this.repository = this.$group(items);
          }
        }
      );
    }
  }
};
</script>

<style></style>
