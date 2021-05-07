module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': '@/assets',
        '@comps': '@components',
        '@views': '@components',
      },
    },
  },
};
