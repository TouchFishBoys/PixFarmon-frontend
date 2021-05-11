<template>
  <v-menu
    transition="slide-y-transition"
    right
    offset-y
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mr-8" icon v-on="on" v-bind="attrs">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>
    <v-card>
      {{ username }}
      <v-card-actions>
        <v-btn :disabled="!isLogged">
          logout
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters("account", ["isLogged"]),
    ...mapState("account", ["username"])
  }
};
</script>

<style></style>
