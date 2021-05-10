<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-spacer />
      <v-col cols="5" class="flex-grow-1">
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
            <!--
            <v-stepper-step :complete="registered" step="3">
              Register
            </v-stepper-step>
            -->
            <v-stepper-step
              :complete="metamaskInstalled && accountConnected && registered"
              step="3"
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
                    {{
                      metamaskInstalled ? "⭕ Next step" : "Install Metamask"
                    }}
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

            <!--
            <v-stepper-content step="3">
              <v-card>
                <v-card-title>
                  Register
                </v-card-title>
                <v-form>
                  <v-text-field label="Your address" v-model="address">
                  </v-text-field>
                  <v-text-field label="Username" v-model="username">
                  </v-text-field>
                </v-form>
                <v-card-actions>
                  <v-spacer />
                  <v-btn v-ripple color="primary" @click="register">
                    {{ registered ? "⭕ Next step" : "Register" }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
            -->

            <v-stepper-content step="3">
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
      </v-col>
      <v-spacer />
    </v-row>
    <v-snackbar v-model="canceled">
      Canceled
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      stepNum: 1,
      metamaskInstalled: false,
      accountConnected: false,
      connecting: false,
      registered: false,
      canceled: false,
      address: "",
      username: ""
    };
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
    register() {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(data => {
          if (data[0]) {
            console.log("this address", data[0]);
            this.$store.dispatch("account/login", data[0]);
          } else {
            console.log(data);
          }
        })
        .catch(error => {
          console.log("Error when register", error);
        });
    },
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
      if (!this.accountConnected) {
        this.connecting = true;
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(accounts => {
            // eslint-disable-next-line prefer-destructuring
            this.address = accounts[0];
            this.accountConnected = true;
            this.stepNum += 1;
            this.connecting = false;
          })
          .catch(error => {
            if (error.code === 4001) {
              // EIP-1193 userRejectedRequest error
              console.log("Please connect to MetaMask.");
              this.canceled = true;
            } else {
              console.error(error);
            }
            this.connecting = false;
          });
      } else {
        this.stepNum += 1;
      }
    },
    enterGame() {
      this.$router.push({
        name: "main"
      });
    }
  },
  created() {
    this.refreshStatus();
  }
};
</script>

<style></style>
