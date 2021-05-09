<template>
  <div class="friend-panel-container">
    <li item-layout="horizontal"></li>
  </div>
</template>

<script>
export default {
  data() {
    return {
      friendList: [
        {
          displayName: "Kerite",
          address: "0x0Be56dA49ef47de7061390120E97fFAAFc92505B"
        }
      ]
    };
  }
};
</script>

<style scoped>
.friend-panel-container {
  position: absolute;
}
</style>
