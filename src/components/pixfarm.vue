<template>
  <div class="pixfarm-container">
    <div class="fields-container">
      <Field
        v-for="index in Array.from(Array(36).keys())"
        :fieldIndex='index'
        :key='index'
        :style="calcCssLocation(index)"
      />
    </div>
  </div>
</template>

<script>
import Field from '@/components/field.vue';
export default {
  components: {Field},
  data() {
    return {
    };
  },
  methods: {
    calcCssLocation(index) {
      const x = Math.floor(index / 6);
      const y = index % 6;
      const modifier = x + y;
      const leftTable = [
        0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384,
      ];
      const css ={
        left: `${leftTable[modifier]}px`,
        top: `calc(50% + ${16*x - 16 * y}px)`,
      };
      console.log('x:', x, 'y:', y, css);
      return css;
    },
  },
};
</script>

<style scoped>
.pixfarm-container {
  margin: auto;
  width: 896px;
  height: 896px;
  background-image: url("../assets/pixfarm-island.gif");
}
.fields-container {
  position: relative;
  left: 160px;
  top: 336.5px;
  width: 384px;
  height: 191px;
}
</style>
