<template>
  <v-sheet
    class="pa-3"
    rounded="lg"
    elevation="5"
    :loading="loading"
    :disabled="loading"
    max-width="400px"
  >
    <v-card outlined class="overflow-y-auto overflow-x-hidden my-2">
      <!-- Process bar -->
      <template v-slot:progress>
        <v-progress-linear indeterminate :active="loading" />
      </template>
      <v-row
        v-for="rowIndex in rowCount"
        :key="`item-row-${rowIndex}`"
        :cols="colCount"
      >
        <v-col
          v-for="colIndex in colCount"
          :key="`item-${rowIndex}-${colIndex}`"
        >
          <v-skeleton-loader
            :loading="loading"
            height="32px"
            width="32px"
            type="image"
            class="mx-auto"
          >
            <v-img
              outline
              :src="getItemImage(rowIndex, colIndex)"
              style="cursor: pointer"
              @click="itemSelected(rowIndex, colIndex)"
              height="32px"
              width="32px"
            ></v-img>
          </v-skeleton-loader>
        </v-col>
      </v-row>
    </v-card>

    <!-- Bottom -->
    <v-sheet>
      <v-pagination v-model="page" :length="pageStack"></v-pagination>
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
import util from "@/util";
import { mapState } from "vuex";

// const itemTypeMapping = ["item-seeds"];

export default {
  props: {
    colCount: {
      type: Number,
      default: 5
    },
    rowCount: {
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
      loading: false,
      rows: Math.floor(50 / this.colCount),
      page: 1,
      pageStack: Math.floor(50 / this.colCount / this.rowCount)
    };
  },
  computed: {
    ...mapState("account", {
      address: state => state.address
    }),
    ...mapState("repository", {
      seeds: state => state.seeds
    })
  },
  methods: {
    itemSelected(row, col) {
      const rowIndex = row - 1;
      const colIndex = col - 1;
      const itemIndex =
        (this.page - 1) * this.rowCount * this.colCount +
        rowIndex * this.colCount +
        colIndex;
      this.$log("Selected item ", itemIndex, this.repository[itemIndex]);
      const item = this.repository[itemIndex]; // TODO tag
      this.$emit("selected", {
        page: this.page,
        rowIndex,
        colIndex,
        itemTag: item.tag
      });
    },
    loadItems() {
      this.loading = true;
      Dapp.repository
        .getItemList(this.address, {
          type: this.itemType,
          user: this.address,
          target: this.address
        })
        .then(items => {
          this.loading = false;
          setTimeout(() => {
            this.repository = items;
          }, 1000);
          this.$log("Repository", this.repository);
        });
    },
    getItemImage(rowIndex, colIndex) {
      const itemIndex =
        (this.page - 1) * this.rowCount * this.colCount +
        (rowIndex - 1) * this.colCount +
        (colIndex - 1);
      const item = this.repository[itemIndex];
      if (typeof item === "undefined") {
        // TODO this is not a valid seed
        return "";
      }
      if (item.stack === "0") {
        // this is a empty slot
        return "";
      }
      return `/imgs/item-seeds/s${util.calSeedType(item.tag)}.png`;
    }
  },
  mounted() {
    this.loadItems();
  }
};
</script>

<style></style>
