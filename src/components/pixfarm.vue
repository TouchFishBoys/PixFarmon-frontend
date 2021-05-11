<template>
  <div class="pixfarm-app">
    <FriendPanel />
    <div class="island-container">
      <div class="fields-container">
        <Field
          v-for="index in Array.from(Array(36).keys())"
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
import FriendPanel from "./friend-panel.vue";

export default {
  name: "Pixfarm",
  components: { Field, FriendPanel },
  data() {
    return {
      selectedIndex: -1,
      loading: true,
      fields: []
    };
  },
  computed: {
    address() {
      return this.$store.state.account.address;
    }
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
      const { address } = this.$store.state.account;
      console.log(address);
      dapp.field.getFields(address, { address }, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          this.updateFields(data);
        }
      });
    },
    updateFields(fieldsData) {
      console.log("Fields:", fieldsData);
      /*
      for (const row in fieldsData) {
        for (const col in row) {
          fields.push({
            seedTag: col.seedTag,
            sowingTime: col.sowingTime,
            unlocked: col.unlocked
          });
        }
      } */
    }
  },
  created() {
    // 判断有无登录
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
