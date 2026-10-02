import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

/**
 * Возвращает id секции, которая сейчас в зоне чтения (верхние 40% экрана).
 * Считаем по скроллу, а не через IntersectionObserver: секции главной
 * монтируются после fade-перехода, и подписываться на них заранее нельзя.
 */
export function useActiveSection(ids: string[]) {
  const active = ref<string | null>(null)
  const route = useRoute()

  const update = () => {
    const line = window.innerHeight * 0.4
    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

    let current: string | null = null
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el && (el.getBoundingClientRect().top <= line || atBottom)) current = id
    }
    active.value = current
  }

  onMounted(() => {
    window.addEventListener('scroll', update, { passive: true })
    update()
  })
  onBeforeUnmount(() => window.removeEventListener('scroll', update))
  watch(() => route.fullPath, () => requestAnimationFrame(update))

  return active
}
