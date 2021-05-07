<template>
  <div class='field-container'>
    <div
      class="response-area"
      @click="onFieldClick"
      :style="responseAreaCss"
    />
    <div
      class='hover-img'
      :style="hoverImgCss"
    />
    <div
      class="selected-img"
      :class="{unselected: !selected}"
      :style="selectedImgCss"
    />
    <div class='field-img' />
  </div>
</template>

<script>
export default {
  name: 'Field',
  props: {
    fieldIndex: Number,
    selected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      responseAreaCss: {
        zIndex: 99 - this.fieldIndex,
      },
      hoverImgCss: {
        zIndex: 79 - this.fieldIndex,
      },
      selectedImgCss: {
        zIndex: 89 - this.fieldIndex,
      },
    };
  },
  methods: {
    onFieldClick() {
      this.$emit('click', this.fieldIndex);
    },
  },
};
</script>

<style scoped>
.response-area {
  position: absolute;
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
  width: 64px;
  height: 64px;
  background-image: url("../assets/field-weed.png");
}
.selected-img {
  position: absolute;
  width: 64px;
  height: 64px;
  background-image: url("~@/assets/field-selected.gif");
}
.selected-img.unselected {
  display: none;
}
.hover-img {
  position: absolute;
  display: none;
  height: 64px;
  width: 64px;
  background-image: url("../assets/field-weed-hover.gif");
}

.response-area:hover + .hover-img {
  display: block;
}
</style>
