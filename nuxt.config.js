export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  css: ['@/assets/main.scss'],
  build: {
    transpile: ['@/components'],
    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            // 这里导入全局的 mixins 或变量文件
            additionalData: `@import "@/assets/libs/_mixins.scss";`
          }
        }
      }
    }
  },
  app: {
    baseURL: '/',
    buildAssetsDir: '/static/'
  },
  router: {
    base: '/'
  },
  ssr: true, // 确保启用了服务器端渲染
  plugins: ['@/plugins/vue-gtag.js', '@/plugins/vue-gtm.js', '@/plugins/fz-bao-you.js']
})
