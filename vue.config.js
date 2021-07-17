const path = require("path");

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  transpileDependencies: ["vuetify"],
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set("@assets", resolve("src/assets"))
      .set("@comps", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@util", resolve("src/util"))
      .set("@dapp", resolve("src/util/pixfarmon-dapp"));
  }
};
