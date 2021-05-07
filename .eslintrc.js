module.exports = {
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  plugins: [
    'vue',
    'html',
  ],
  root: true,
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.js', '.json', '.ts', '.vue'],
      },
    },
  },
};
