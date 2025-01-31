<template>
  <div class="field-container">
    <div class="response-area" @click="onFieldClick" :style="responseAreaCss" />
    <div class="hover-img" />
    <div class="selected-box" :class="{ unselected: !selected }">
      <tool-box
        :selected="selected"
        :fieldType="fieldType"
        :fieldIndex="fieldIndex"
      />
      <div class="selected-img" />
    </div>
    <img class="field-img" :src="fieldImage" />
  </div>
</template>

<script>
// import Dapp from "@/util/pixfarmon-dapp";
import { mapState } from "vuex";
import util from "@/util";
import ToolBox from "./toolbox.vue";

export default {
  name: "Field",
  components: { ToolBox },
  props: {
    fieldIndex: Number,
    fieldTime: Number,
    fieldData: Array,
    selected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      responseAreaCss: {
        zIndex: 99 - this.fieldIndex
      }
    };
  },
  computed: {
    fieldType() {
      if (!this.fieldData || this.fieldData.specie === "0") {
        return 1;
      }
      if (
        util.calPlantAge(
          this.fieldData.sowingTime,
          this.fieldData.maturityTime,
          this.fieldTime
        ) === 3
      ) {
        return 3;
      }
      return 2;
    },
    fieldImage() {
      if (!this.fieldData || this.fieldData.specie === "0") {
        return `${this.publicPath}imgs/field-empty.png`;
      }
      return this.getPlantImage(
        this.fieldData.seedTag,
        this.fieldData.sowingTime,
        this.fieldData.maturityTime
      );
    },
    ...mapState("account", {
      address: state => state.address
    })
  },
  methods: {
    onFieldClick() {
      this.$emit("click", this.fieldIndex);
    },
    getPlantImage(seedTag, sowingTime, maturityTime) {
      this.$log(
        "Getting plant image at",
        this.fieldIndex,
        "seedTag:",
        seedTag,
        ",",
        "sowingTime:",
        sowingTime,
        "maturityTime:",
        maturityTime
      );
      const age = util.calPlantAge(sowingTime, maturityTime, this.fieldTime);
      const url = `/imgs/plants/${util.calSeedType(seedTag)}s${age}.png`;
      this.$log(url);
      return url;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style.scss";
div {
  @include unselectable;
}
.response-area {
  position: absolute;
  z-index: 100;
  cursor: pointer;
  top: 32px;
  width: 64px;
  height: 32px;
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  overflow: hidden;
}
.field-container {
  position: absolute;
  width: 64px;
  height: 64px;
}
.field-img {
  position: absolute;
  z-index: 10;
  top: 0px;
  width: 64px;
  height: 64px;
}
.tool-button {
  transform: scale(0);
}
.tool-button.selected {
  transform: scale(1);
  transition: transform 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.round-button-cover {
  position: absolute;
  z-index: 500;
  width: 48px;
  height: 48px;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
}

.selected-box.unselected {
  width: 0;
  overflow: hidden;
  div {
    // display:none会导致动画不播放
    //display: none;
    width: 0;
  }
}
.selected-box {
  margin-top: -48px;
  width: 64px;
  height: 112px;
  .selected-img {
    position: absolute;
    z-index: 15;
    width: 64px;
    height: 64px;
    bottom: 0px;
    background-image: url("~@/assets/field-selected.webp");
  }
  .tools-box {
    position: absolute;
    left: calc((64px - 48px) / 2);
    z-index: 105;
    .tool-sowing {
      z-index: 105;
      width: 48px;
      height: 48px;
      background: url("~@/assets/btn-sowing.webp");
    }
  }
}
.hover-img {
  position: absolute;
  display: none;
  height: 64px;
  width: 64px;
  z-index: 12;
  background-image: url("~@/assets/field-weed-hover.webp");
}
.response-area:hover + .hover-img {
  display: block;
}
</style>
