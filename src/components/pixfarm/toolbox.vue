<template>
  <div class="tool-box">
    <div
      class="tool"
      v-for="tool in tools"
      :key="tool.key"
      :class="{ usable: tool.usable }"
    >
      <div
        class="tool-cover"
        v-if="tool.usable"
        @click="toolClicked(tool.key)"
      />
      <transition name="vt-scale">
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
      // 0:Locked 1:Empty 2:growing 3:maturation
      default: 0
    }
  },
  data() {
    return {
      //
    };
  },
  computed: {
    tools() {
      return [
        {
          key: "harvest",
          icon: require("@/assets/btn-harvest.gif"),
          usable: this.fieldType === 3
        },
        {
          key: "sowing",
          icon: require("@/assets/btn-sowing.gif"),
          usable: this.fieldType === 1
        },
        {
          key: "eradicate",
          icon: require("@/assets/btn-eradicate.gif"),
          usable: this.fieldType >= 2
        }
      ];
    }
  },
  methods: {
    toolClicked(toolName) {
      this.$gemit(`${toolName}Tool`);
    }
  }
};
</script>

<style lang="scss" scoped>
.tool-box {
  position: relative;
  z-index: 110;
  display: flex;
  width: fit-content;
  height: 48px;
}
.tool {
  z-index: 110;
  width: 48px;
  height: 48px;
  margin-left: 2px;
  margin-right: 2px;
}
.tool-cover {
  position: absolute;
  cursor: pointer;
  z-index: 150;
  width: 48px;
  height: 48px;
  overflow: hidden;
}
.tool-img {
  position: absolute;
  width: 48px;
  height: 48px;
  z-index: 110;
}
// 不可用的工具
.tool:not(.usable) {
  .tool-img {
    width: 48px;
    height: 48px;
    filter: grayscale(100%);
  }
}
</style>

<style>
.vt-scale-enter-active {
  transition: transform 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.vt-scale-leave-active {
  transition: transform 600mx cubic-bezier(0.175, 0.885, 0.32, 1.275) reverse;
}
</style>
