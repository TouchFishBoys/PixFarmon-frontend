<template>
  <div class="tool-box">
    <div
      class="tool"
      v-for="tool in tools"
      :key="tool.key"
      :class="{ usable: tool.usable }"
    >
      <div class="tool-cover" v-if="tool.usable" />
      <transition name="scale">
        <div
          class="tool-img"
          :style="{ backgroundImage: `url(${tool.icon})` }"
        />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "FieldToolBox",
  props: {
    fieldType: {
      type: Number,
      // 0:Empty 1:seed 2:growing 3:maturation
      default: 0
    }
  },
  data() {
    return {
      tools: [
        {
          key: "harvest",
          icon: require("@/assets/btn-harvest.gif"),
          usable: this.fieldType === 3
        },
        {
          key: "sowing",
          icon: require("@/assets/btn-sowing.gif"),
          usable: this.fieldType === 0
        },
        {
          key: "eradicate",
          icon: require("@/assets/btn-eradicate.gif"),
          usable: true
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.tool-box {
  display: flex;
  width: fit-content;
  height: 48px;
}
.tool {
  width: 48px;
  height: 48px;
  margin-left: 2px;
  margin-right: 2px;
}
.tool-cover {
  cursor: pointer;
}
// 不可用的工具
.tool:not(.usable) {
  .tool-img {
    filter: grayscale(100%);
  }
}
</style>

<style>
.vt-scale-enter-active {
  transition: transform 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
