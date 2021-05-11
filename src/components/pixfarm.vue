<template>
  <div class="pixfarm-app">
    <FriendPanel />
    <SowingDialog ref="sowing" />
    <div class="island-container">
      <div class="fields-container">
        <Field
          v-for="index in Array.from(Array(36).keys())"
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
import { mapState } from "vuex";
import FriendPanel from "./friend-panel.vue";
import SowingDialog from "./pixfarm/sowing-dialog.vue";

export default {
  name: "Pixfarm",
  components: { Field, FriendPanel, SowingDialog },
  data() {
    return {
      selectedIndex: -1,
      loading: true,
      fields: []
    };
  },
  computed: {
    ...mapState("account", {
      address: state => state.address
    })
  },
  methods: {
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
      console.log("field clicked:", param);
      if (param === this.selectedIndex) {
        this.selectedIndex = -1;
      } else {
        this.selectedIndex = param;
      }
    },
    loadFields() {
      dapp.field.getFields(
        this.address,
        {
          address: this.address
        },
        (error, data) => {
          if (error) {
            console.log(error);
          } else {
            this.$gon("sowingTool", fieldIndex => {
              this.$refs.sowing.sowing(fieldIndex);
            });
            this.$on("harvestTool", fieldIndex => {
              const { x, y } = this.$i2xy(fieldIndex);
              dapp.field.harvest(this.address, { x, y }, harvestError => {
                if (harvestError) {
                  console.log("Error harvesting", error);
                } else {
                  this.loadFields();
                }
              });
            });
            this.updateFields(data);
          }
        }
      );
    },
    updateFields(fieldsData) {
      this.fields = fieldsData.flat();
    }
  },
  created() {
    this.loadFields();
  }
};
</script>

<style scoped>
.pixfarm-app {
  margin: auto;
  width: 896px;
  height: 896px;
}
.island-container {
  height: 896px;
  background-image: url("~@/assets/pixfarm-island.gif");
}
.fields-container {
  position: relative;
  left: 160px;
  top: 336.5px;
  width: 384px;
  height: 191px;
}
.water {
  width: 896px;
  height: calc(100vh - 896px);
  background-image: url("~@/assets/water.gif");
  background-repeat: repeat-y;
}
</style>
