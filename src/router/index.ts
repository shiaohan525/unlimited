import { createRouter, createWebHistory } from 'vue-router'
// 新增子頁面名稱和路徑
import HomeView from '../pages/HomeView.vue'
import AboutView from '../pages/AboutView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // routes 新增單一頁面路由（path、name、component）
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router
