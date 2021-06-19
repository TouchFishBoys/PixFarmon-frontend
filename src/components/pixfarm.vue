<template>
  <div class="pixfarm-app">
    <FriendPanel />
    <Shop ref="seedShop" />
    <SowingDialog ref="sowing" />
    <div class="island-container">
      <div class="shop-btn" @click.stop="$refs.seedShop.showShop()"></div>
      <div class="fields-container">
        <Field
          v-for="index in Array.from(Array(36).keys())"
          :fieldTime="time"
          :fieldData="fields[index]"
          :fieldIndex="index"
          :key="index"
          :style="calcCssLocation(index)"
          :selected="index == selectedIndex"
          @click="fieldClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Field from "@/components/pixfarm/field.vue";
import dapp from "@/util/pixfarmon-dapp";
import { indexToCoor } from "@/util";
import { mapState, mapActions } from "vuex";
import FriendPanel from "./friend-panel.vue";
import SowingDialog from "./pixfarm/sowing-dialog.vue";
import Shop from "./pixfarm/shop.vue";
// import Shop from "./pixfarm/shop.vue";

export default {
  name: "Pixfarm",
  components: { Field, FriendPanel, SowingDialog, Shop },
  data() {
    return {
      selectedIndex: -1,
      loading: true,
      fields: [],
      time: 0,
      shopDialog: false
    };
  },
  watch: {
    address() {
      this.$log("address changed");
      this.loadFields();
    }
  },
  computed: {
    ...mapState("account", {
      address: state => state.address
    })
  },
  methods: {
    ...mapActions("account", ["connect"]),
    calcCssLocation(index) {
      const x = Math.floor(index / 6);
      const y = index % 6;
      const modifier = x + y;
      const css = {
        left: `${32 * modifier}px`,
        top: `calc(50% + ${16 * x - 16 * y - 16}px)`
      };
      // console.log('x:', x, 'y:', y, css);
      return css;
    },
    fieldClick(param) {
      this.$log("field clicked:", param);
      if (param === this.selectedIndex) {
        this.selectedIndex = -1;
      } else {
        this.selectedIndex = param;
      }
    },
    loadFields() {
      if (this.address !== "") {
        dapp.field.getFields(this.address, (error, data) => {
          if (error) {
            this.$log(error);
          } else {
            this.$gon("sowingTool", fieldIndex => {
              this.$refs.sowing.sowing(fieldIndex);
            });
            this.$gon("harvestTool", fieldIndex => {
              dapp.field
                .harvest(this.address, indexToCoor(fieldIndex))
                .then(() => {
                  this.loadFields();
                })
                .catch(harvestError => {
                  this.$log("Error harvesting", harvestError);
                });
            });
            this.$gon("eradicateTool", fieldIndex => {
              dapp.field
                .eradicate(this.address, indexToCoor(fieldIndex))
                .then(() => {
                  this.loadFields();
                })
                .catch(eradicateError => {
                  this.$log("Error eradicating", eradicateError);
                });
            });
            this.$gon("refreshField", () => {
              this.loadFields();
            });
            this.updateFields(data);
          }
        });
      } else {
        this.connect().then(() => {
          this.$emit("connected");
          this.$log("Connect successfully");
        });
      }
    },
    updateFields(fieldsData) {
      this.fields = fieldsData[1].flat();
      this.time = parseInt(fieldsData[0], 10);
      this.$log("Fields:", this.fields);
      this.$log("Time in the blockchain", this.time);
    }
  },
  created() {
    this.loadFields();
  }
};
</script>

<style scoped>
.shop-btn {
  position: absolute;
  z-index: 20;
  cursor: pointer;
  width: 125px;
  height: 75px;
  left: 145px;
  top: 325px;
}
.pixfarm-app {
  margin: auto;
  width: 896px;
  height: 896px;
}
.island-container {
  position: relative;
  height: 896px;
  background-image: url("~@/assets/pixfarm-island.webp");
}
.fields-container {
  position: absolute;
  left: 160px;
  top: 336.5px;
  width: 384px;
  height: 191px;
}
.water {
  width: 896px;
  height: calc(100vh - 896px);
  background-image: url("~@/assets/water.webp");
  background-repeat: repeat-y;
}
</style>
