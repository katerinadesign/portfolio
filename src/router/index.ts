import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

// Высота липкой шапки с отступом — чтобы заголовок секции не прятался под ней
const HEADER_OFFSET = 96

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from) {
    if (to.hash) {
      // С другой страницы ждём конца fade-перехода, иначе секции ещё нет в DOM
      const delay = to.name === from.name ? 0 : 300
      return new Promise((resolve) =>
        setTimeout(() => resolve({ el: to.hash, top: HEADER_OFFSET, behavior: 'smooth' }), delay),
      )
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/concepts/:slug',
      name: 'concept',
      component: () => import('@/views/ConceptView.vue'),
      props: true,
    },
    {
      // Заглушка для несуществующих маршрутов
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
