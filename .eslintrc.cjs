/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    '@nuxtjs/eslint-config-typescript', 
    'plugin:nuxt/recommended' 
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  globals: {
    defineNuxtConfig: 'readonly'         // 告诉 ESLint 这个全局变量是只读的
  }
}
