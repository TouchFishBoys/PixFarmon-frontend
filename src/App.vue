<template>
  <v-app dark>
    <v-app-bar app dense>
      <v-app-bar-title>Pixfarmon</v-app-bar-title>
      <v-spacer />
      <UserPanel />
    </v-app-bar>

    <v-main>
      <v-container class="pa-4" fluid>
        <router-view />
      </v-container>
    </v-main>
    <v-footer fixed> </v-footer>
  </v-app>
</template>

<script>
import UserPanel from "./components/user-panel.vue";

export default {
  components: { UserPanel },
  name: "App",
  data: () => ({
    //
  }),
  methods: {
    //
  }
};
</script>

<style scoped></style>
