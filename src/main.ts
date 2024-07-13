import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Include Google Analytics
import VueGtag from 'vue-gtag-next'
import { createGtm } from '@gtm-support/vue-gtm'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Google Analytics setting
app.use(VueGtag, {
  property: {
    id: 'G-DPNHKLVTKK'
  },
  useDebugger: true
})

app.use(
  createGtm({
    id: 'GTM-T8GWPHTS',
    debug: true,
    defer: true,
    vueRouter: router,
    trackOnNextTick: false
  })
)
