<template>
  <v-sheet height="200" :loading="loading" :disabled="loading">
    <v-progress-linear indeterminate :active="loading" />
    <v-row
      :disabled="loading"
      v-for="(itemCol, rowIndex) in repository"
      :key="`item-row-${rowIndex}`"
    >
      <v-col
        v-for="(item, colIndex) in itemCol"
        :key="`item-${rowIndex}-${colIndex}`"
      >
        <img
          @click="itemSelected(rowIndex, colIndex)"
          :src="getItemImg(rowIndex, colIndex)"
        />
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-sheet>
      <v-spacer></v-spacer>
      <v-btn icon fab dark small color="primary" @click="loadItems">
        <v-icon dark>
          mdi-refresh
        </v-icon>
      </v-btn>
    </v-sheet>
  </v-sheet>
</template>

<script>
import Dapp from "@/util/pixfarmon-dapp";
import { mapState } from "vuex";
import util from "@/util";

const itemTypeMapping = ["item-seeds"];

export default {
  props: {
    colCount: {
      type: Number,
      default: 5
    },
    itemType: {
      type: Number,
      default: 0
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
    itemSelected(rowIndex, colIndex) {
      const itemTag = this.repository[rowIndex * this.colCount + colIndex]; // TODO tag
      this.$emit("selected", { itemTag, rowIndex, colIndex });
    },
    loadItems() {
      this.loading = true;
      setTimeout(() => {
        Dapp.repository.getItemList(
          this.address,
          {
            type: this.itemType,
            user: this.address,
            target: this.address
          },
          (error, items) => {
            this.loading = false;

            if (error) {
              console.log(error);
            } else {
              console.log("Get items:", items);
              this.repository = this.$group(items);
            }
          }
        );
      }, 1000);
    },
    getItemImg(rowIndex, colIndex) {
      const item = this.repository[rowIndex * this.colCount + colIndex];
      console.log("Item is", item);
      const { itemType, tag } = item;
      const specie = util.getItemSpecie(tag);
      return `${process.env.BASE_URL}imgs/${itemTypeMapping[itemType]}/s${specie}`; // TODO item type
    }
  }
};
</script>

<style></style>
