const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  transpileDependencies: ["vuetify"],
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp(`\\.(html|js|css)`),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: true
        })
      );
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@assets", resolve("src/assets"))
      .set("@comps", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@util", resolve("src/util"))
      .set("@dapp", resolve("src/util/pixfarmon-dapp"));
  }
};
