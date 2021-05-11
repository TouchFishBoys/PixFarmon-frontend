<template>
  <v-responsive max-width="868px" class="mx-auto">
    <v-sheet class="mx-auto pa-4">
      <v-stepper v-model="stepNum">
        <v-stepper-header>
          <v-stepper-step :complete="metamaskInstalled" step="1">
            Install Wallet
          </v-stepper-step>
          <v-divider />
          <v-stepper-step :complete="accountConnected" step="2">
            Connect to an account
          </v-stepper-step>
          <v-divider />
          <v-stepper-step :complete="registered" step="3">
            Register
          </v-stepper-step>
          <v-divider />
          <v-stepper-step
            :complete="metamaskInstalled && accountConnected && registered"
            step="4"
          >
            Enter the game
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card>
              <v-card-title>
                You should install a wallet to play this game
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn v-ripple color="primary" @click="installMetaMask">
                  {{ metamaskInstalled ? "⭕ Next step" : "Install Metamask" }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card>
              <v-card-title>
                Please connect your account to this page
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  v-ripple
                  color="primary"
                  @click="connectAccount"
                  :loading="connecting"
                >
                  {{ accountConnected ? "⭕ Next step" : "Connect" }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card>
              <v-form>
                <v-text-field label="Your address" v-model="address" disabled />
                <v-text-field label="Username" v-model="username" />
              </v-form>

              <v-card-actions>
                <v-spacer />
                <v-btn v-ripple color="primary" @click="register">
                  {{ registered ? "⭕ Next step" : "Register" }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-card>
              <v-card-title>
                Congratulations!You can enter this game now
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn v-ripple color="primary" @click="enterGame">
                  Enter
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-sheet>
    <v-snackbar v-model="canceled">
      Canceled
    </v-snackbar>
  </v-responsive>
</template>

<script>
import Dapp from "@/util/pixfarmon-dapp";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      stepNum: 1,
      metamaskInstalled: false,
      accountConnected: false,
      connecting: false,
      registered: false,
      canceled: false,
      tabPage: "register"
    };
  },
  computed: {
    ...mapState("account", {
      address: state => state.address,
      username: state => state.username
    })
  },
  methods: {
    installMetaMask() {
      this.refreshStatus();
      if (this.metamaskInstalled) {
        this.stepNum += 1;
      } else {
        window.open("https://metamask.io/download.html", "_blank");
      }
    },
    register() {},
    refreshStatus() {
      if (window.ethereum) {
        this.metamaskInstalled = true;
      } else {
        this.metamaskInstalled = false;
      }
    },
    refreshConnected() {
      if (window.ethereum && window.ethereum.isConnected()) {
        this.accountConnected = true;
      } else {
        this.accountConnected = false;
      }
    },
    connectAccount() {
      if (this.accountConnected) {
        this.stepNum = 3;
      }
      this.connecting = true;
      this.connect().then(() => {
        this.connecting = false;
        this.metamaskInstalled = true;
        this.accountConnected = true;
        Dapp.account.login(this.account, (error, username) => {
          if (error) {
            console.log("May not registered", error);
          } else {
            this.$store.commit("account/username", username);
          }
        });
        this.stepNum = 3;
      });
    },
    enterGame() {
      this.$router.push({
        name: "main"
      });
    },
    ...mapActions("account", ["connect", "login"])
  },
  created() {
    this.connectAccount();
  }
};
</script>

<style></style>
