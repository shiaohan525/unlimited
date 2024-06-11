import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), VueDevTools()],
  base: '/unlimited/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       prependData: '@import "unlimited/src/assets/main.scss";'
  //     }
  //   }
  // }
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/libs/_mixins.scss";`
        // additionalData: `$mobile: 540px; $pad: 768px; $desktop: 1024px;`
      }
    }
  }
})
