<template>
  <div class="friend-panel-container">
    <a-list
      item-layout='horizontal'
      :data-source="friendList"
    >
      <template #renderItem="{item}">
        <a-list-item>
          <a-list-item-meta>
            <template  #title>
              <a>{{item.displayName}}</a>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      friendList: [
        {
          displayName: 'Kerite',
          address: '0x0Be56dA49ef47de7061390120E97fFAAFc92505B',
        },
      ],
    };
  },
};
</script>

<style>
</style>
