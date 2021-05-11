module.exports = {
  transpileDependencies: ["vuetify"],
  productionSourceMap: process.env.NODE_ENV !== "production",
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
  }
};
