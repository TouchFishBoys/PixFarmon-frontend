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
            <v-stepper-step :complete="stepNum > 3" step="3">
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
                    {{ metamaskInstalled ? "Next step" : "Install Metamask" }}
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
                  <v-btn v-ripple color="primary" @click="connectAccount">
                    {{ accountConnected ? "Next step" : "Connect" }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      stepNum: 1,
      metamaskInstalled: false,
      accountConnected: false
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
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(() => {
            this.accountConnected = true;
            this.stepNum += 1;
          })
          .catch(error => {
            if (error.code === 4001) {
              // EIP-1193 userRejectedRequest error
              console.log("Please connect to MetaMask.");
            } else {
              console.error(error);
            }
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
