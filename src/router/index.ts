import { createRouter, createWebHistory } from 'vue-router'

const home = () => import('@/views/home/index.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        title: '导航页'
      },
      component: home
    }
  ]
})

export default router
