<template>
  <v-dialog width="400px" v-model="dialog" persistent>
    <v-card>
      <v-card-title>
        Seed Shop
      </v-card-title>
      <v-sheet class="ma-4">
        <v-row v-for="(specieRow, specieIndex) in species" :key="specieIndex">
          <v-col v-for="specie in specieRow" :key="specie" class="pa-auto">
            <v-img
              contain
              height="32"
              width="32"
              aspect-ratio="1"
              class="mx-auto cursor-pointer"
              :class="{ selected: specie == selectedSpecie }"
              :src="`/imgs/item-seeds/s${specie}.png`"
              @click="selectedSpecie = specie"
            />
          </v-col>
        </v-row>
        <v-row> </v-row>
      </v-sheet>

      <v-card-actions>
        <v-text-field
          prepend-inner-icon="mdi-minus"
          @click:prepend-inner="decrease"
          append-icon="mdi-plus"
          @click:append="increase"
          single-line
          hide-details
          solo
          v-model.number="amount"
          dense
        >
          <!-- <template v-slot:prepend-inner>
            <v-btn @click="amount = amount - 10" small :disabled="amount < 10"
              >--</v-btn
            >
            <v-btn @click="amount = amount - 1" small :disabled="amount <= 0"
              >-</v-btn
            >
          </template>
          <template v-slot:append>
            <v-btn @click="amount = parseInt(amount) + 1" small>+</v-btn>
            <v-btn @click="amount = parseInt(amount) + 10" small>++</v-btn>
          </template> -->
        </v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="buySeed"> Buy</v-btn>
        <v-btn @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Dapp from "@/util/pixfarmon-dapp";
import { mapState } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      maxLevel: 4,
      species: [
        [0, 1, 2, 3],
        [4, 5, 6, 7]
      ],
      selectedSpecie: 0,
      amount: 0
    };
  },
  computed: {
    ...mapState("account", { address: state => state.address })
  },
  methods: {
    decrease() {
      if (window.event.ctrlKey) {
        this.amount =
          this.amount < 10 ? this.amount : parseInt(this.amount, 10) - 10;
      } else {
        this.amount = this.amount <= 0 ? 0 : parseInt(this.amount, 10) - 1;
      }
    },
    increase() {
      if (window.event.ctrlKey) {
        this.amount = parseInt(this.amount, 10) + 10;
      } else {
        this.amount = parseInt(this.amount, 10) + 1;
      }
    },
    showShop() {
      this.dialog = true;
    },
    buySeed() {
      this.$log("Buying");
      Dapp.farm
        .buySeed(this.address, {
          specie: this.selectedSpecie,
          level: 0,
          amount: this.amount
        })
        .then(() => {
          console.log("OK");
        });
    }
  }
};
</script>

<style scoped>
.selected {
  background-color: rgba(125, 125, 125, 125);
}
</style>

<style>
.v-input--selection-controls__input {
  display: none !important;
}
</style>
