<template>
  <div class='field-container'>
    <div
      class="response-area"
      @click="onFieldClick"
      :style="responseAreaCss"
    >
    </div>
    <div
      class='hover-img'
      :style="hoverImgCss"
    />
    <div class='field-img' />
  </div>
</template>

<script>
export default {
  props: {
    fieldIndex: Number,
  },
  data() {
    return {
      responseAreaCss: {
        zIndex: 99 - this.fieldIndex,
      },
      hoverImgCss: {
        zIndex: 97 - this.fieldIndex,
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
  position:absolute;
  cursor: pointer;
  top: 32px;
  width: 64px;
  height: 32px;
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  overflow: hidden;
}
.field-container {
  position:absolute;
  margin-top: -16px;
  width: 64px;
  height: 64px;
}
.field-img {
  position:absolute;
  width: 64px;
  height: 64px;
  background-image: url("../assets/field-weed.png");
}
.hover-img {
  position:absolute;
  display: none;
  height: 64px;
  width: 64px;
  background-image: url("../assets/field-weed-hover.gif");
}

.response-area:hover + .hover-img {
  display: block;
}
</style>
