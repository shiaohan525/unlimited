import open from 'open'
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  css: ['@/assets/main.scss'],

  hooks: {
    listen(server) {
      // 確認使用的 port
      const port = server.port || 3000
      const url = `http://localhost:${port}`

      // 自動打開瀏覽器
      open(url).catch((err) => {
        console.error('Failed to open browser:', err)
      })

      console.log(`Server is running at ${url}`)
    }
  },

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
    buildAssetsDir: '/static/',
    //SEO meta
    head: {
      title: "The Unlimited｜HsiaoHan's Style：Web、Design And Future",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            '致力為品牌打造獨一無二的設計！提供平面與網頁設計服務，分享設計理念和開發心路歷程'
        },
        // { hid: 'keywords', name: 'keywords', content: 'keyword1, keyword2, keyword3' },
        { name: 'robots', content: '平面設計,商業設計, 網頁設計, 印刷輸出' },
        { name: 'author', content: 'HsiaoHan Hsu' },
        {
          property: 'og:title',
          content: "The Unlimited｜HsiaoHan's Style：Web、Design And Future"
        },
        {
          property: 'og:description',
          content:
            '致力為品牌打造獨一無二的設計！提供平面與網頁設計服務，分享設計理念和開發心路歷程'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://theunlimited.cc/' },
        { property: 'og:image', content: 'https://theunlimited.cc/images/og_image.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: "The Unlimited｜HsiaoHan's Style：Web、Design And Future"
        },
        {
          name: 'twitter:description',
          content:
            '致力為品牌打造獨一無二的設計！提供平面與網頁設計服務，分享設計理念和開發心路歷程'
        },
        { name: 'twitter:image', content: 'https://theunlimited.cc/images/twitter_image.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://theunlimited.cc/' }
      ]
    }
  },

  router: {
    base: '/'
  },

  // 服務器端渲染
  ssr: true,

  plugins: ['@/plugins/vue-gtag.js', '@/plugins/vue-gtm.js', '@/plugins/fz-bao-you.js'],

  // 日誌測試
  debug: true,

  compatibilityDate: '2024-10-10'
})
