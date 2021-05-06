module.exports = {
  'extends': [
    'plugin:vue/essential',
    'google',
  ],

  'plugins': [
    'vue',
  ],

  'root': true,

  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
    'parser': 'babel-eslint',
  },

  'rules': {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
