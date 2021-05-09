<template>
  <v-app dark>
    <v-app-bar app dense>
      <v-app-bar-title>Pixfarmon</v-app-bar-title>
      <v-spacer />
      <v-menu transition="slide-y-transition" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mr-8" icon v-on="on" v-bind="attrs">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-card>
          A stub panel
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <v-footer fixed> </v-footer>
  </v-app>
</template>

<script>
export default {
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
