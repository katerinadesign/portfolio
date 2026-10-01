import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    // При переходе между страницами всегда прокручиваем наверх
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects/:slug',
      name: 'project',
      // Ленивая загрузка страницы проекта
      component: () => import('@/views/ProjectView.vue'),
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
