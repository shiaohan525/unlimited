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

console.log([
  "                   _ooOoo_",
  "                  o8888888o",
  "                  88\" . \"88",
  "                  (| -_- |)",
  "                  O\\  =  /O",
  "               ____/`---'\\____",
  "             .'  \\\\|     |//  `.",
  "            /  \\\\|||  :  |||//  \\",
  "           /  _||||| -:- |||||-  \\",
  "           |   | \\\\\\  -  /// |   |",
  "           | \\_|  ''\\---/''  |   |",
  "           \\  .-\\__  `-`  ___/-. /",
  "         ___`. .'  /--.--\\  `. . __",
  "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
  "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
  "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
  "======`-.____`-.___\\_____/___.-`____.-'======",
  "                   `=---='",
  "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
  "             佛祖保佑       永無BUG"
].join('\n'))

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
