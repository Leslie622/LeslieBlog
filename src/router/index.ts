import { createRouter, createWebHistory } from 'vue-router'

const home = () => import('@/views/home/index.vue')
const blog = () => import('@/views/blog/index.vue')

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
        title: '主页'
      },
      component: home
    },
    {
      path: '/blog',
      name: 'blog',
      meta: {
        title: '博客'
      },
      component: blog
    }
  ]
})

export default router
