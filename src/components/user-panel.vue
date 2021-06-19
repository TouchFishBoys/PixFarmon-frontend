<template>
  <v-menu
    transition="slide-y-transition"
    right
    offset-y
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mr-8" v-on="on" v-bind="attrs" color="primary">
        <v-icon>mdi-account</v-icon>
        {{ address ? address : "Not Connected" }}
      </v-btn>
    </template>

    <v-card>
      <v-tabs> </v-tabs>
      <v-card-actions>
        <v-btn v-if="!isLogged" @click="connectAccount">
          login
        </v-btn>
        <v-btn @click="register">
          Register
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import dapp from "@/util/pixfarmon-dapp";
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("account", ["isLogged"]),
    ...mapState("account", ["username", "address"])
  },
  methods: {
    ...mapActions("account", ["connect"]),
    connectAccount() {
      this.connect().then(() => {
        this.$emit("connected");
        this.$log("Connect successfully");
      });
    },
    register() {
      dapp.account
        .register(this.address, { username: this.address })
        .then(() => {
          this.$gemit("refreshField");
        })
        .catch(error => {
          this.$log(error);
        });
    }
  }
};
</script>

<style></style>
