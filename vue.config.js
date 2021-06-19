module.exports = {
  transpileDependencies: ["vuetify"],
  productionSourceMap: false,
  configureWebpack: {
    devtool: process.env.NODE_ENV === "production" ? undefined : "source-map",
    resolve: {
      alias: {
        "@assets": "@/assets",
        "@comps": "@/components",
        "@views": "@/views",
        "@dapp": "@/util/pixfarmon-dapp"
      }
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.plugins.delete("prefetch");
      config.externals({
        vue: "vue",
        vuex: "vuex",
        "vue-router": "vue-router",
        web3: "web3"
      });
    }
  }
};
