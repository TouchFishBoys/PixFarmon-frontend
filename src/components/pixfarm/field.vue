<template>
  <div class="field-container">
    <div class="response-area" @click="onFieldClick" :style="responseAreaCss" />
    <div class="hover-img" />
    <div class="selected-box" :class="{ unselected: !selected }">
      <tool-box />
      <div class="selected-img" />
    </div>
    <div
      class="field-img"
      :style="{
        backgroundImage: `url(${
          fieldData.unlocked ? require('@/assets/field-weed.png') : planted
        })`
      }"
    />
  </div>
</template>

<script>
import util from "@/util";
import ToolBox from "./toolbox.vue";

export default {
  name: "Field",
  components: { ToolBox },
  props: {
    fieldIndex: Number,
    fieldData: Object,
    selected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      responseAreaCss: {
        zIndex: 99 - this.fieldIndex
      }
    };
  },
  computed: {
    fieldCss() {
      const result = {
        image: `url(${require("@/assets/field-weed.png")})`
      };
      if (!this.unlocked) {
        result.filter = "grayscale(100%)";
      } else if (this.used) {
        // TODO
        const currentTime = Date.now() / 1000;
        console.log("now", currentTime);
        const plantedTime = this.fieldData.sowingTime;
        const maturityTime = this.fieldData.munityTime;
        const level =
          ((currentTime - plantedTime) / (maturityTime - plantedTime)) * 100;
        if (level >= 100) {
          result.image = `url(${require("@/assets/field-weed.png")})`;
        } else {
          // eslint-disable-next-line import/no-dynamic-require
          result.image = `url(${require(`@/assets/plants/${util.getPlantType(
            this.fieldData.seedTag
          )}-${util.getPlantAge(level)}.png`)})`;
        }
      }
      return result;
    }
  },
  methods: {
    onFieldClick() {
      this.$emit("click", this.fieldIndex);
    }
  }
};
</script>

<style lang="scss" scoped>
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
  background-image: url("~@/assets/field-weed.png");
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
    background-image: url("~@/assets/field-selected.gif");
  }
  .tools-box {
    position: absolute;
    left: calc((64px - 48px) / 2);
    z-index: 105;
    .tool-sowing {
      z-index: 105;
      width: 48px;
      height: 48px;
      background: url("~@/assets/btn-sowing.gif");
    }
  }
}
.hover-img {
  position: absolute;
  display: none;
  height: 64px;
  width: 64px;
  z-index: 12;
  background-image: url("~@/assets/field-weed-hover.gif");
}
.response-area:hover + .hover-img {
  display: block;
}
</style>
