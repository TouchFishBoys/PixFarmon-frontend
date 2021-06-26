const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const resolve = dir => path.join(__dirname, dir);

// const cdn = {
//   externals: {
//     vue: "Vue",
//     vuex: "Vuex",
//     "vue-router": "VueRouter"
//   },
//   js: [
//     "https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js",
//     "https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js",
//     "https://cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js"
//   ]
// };

module.exports = {
  transpileDependencies: ["vuetify"],
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp(`\\.(html|js|css)`),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
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
