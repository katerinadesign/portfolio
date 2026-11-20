<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import ProjectCover from './ProjectCover.vue'
import { concepts, conceptLink } from '@/data/concepts'

/**
 * Проекты стопкой при прокрутке, в фиолетовом стекле — как шапка и первый блок.
 * Каждая карточка «прилипает» под шапкой, следующая наезжает на неё, а накрытая
 * уменьшается и уходит в тень.
 */
const cards = ref<HTMLElement[]>([])
let raf = 0

const update = () => {
  const els = cards.value
  els.forEach((el, i) => {
    const next = els[i + 1]
    if (!next) return el.style.setProperty('--p', '0')
    const r = el.getBoundingClientRect()
    const nr = next.getBoundingClientRect()
    // 0 — следующая ещё далеко, 1 — полностью накрыла
    const p = Math.min(Math.max((r.bottom - nr.top) / r.height, 0), 1)
    el.style.setProperty('--p', p.toFixed(3))
  })
}
const onScroll = () => {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(update)
}
onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <ul class="flex flex-col gap-6 pb-8">
    <li v-for="(c, i) in concepts" :key="c.slug" ref="cards" class="ps-card" :style="{ top: `${96 + i * 10}px` }">
      <RouterLink
        :to="conceptLink(c)"
        class="ps-inner group relative grid grid-cols-1 gap-4 rounded-[32px] glass p-3 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:grid-cols-[1fr_2fr] md:gap-6"
      >
        <div class="flex flex-col justify-between gap-6 p-3 md:p-5">
          <div>
            <span class="text-sm font-medium tabular-nums opacity-45">{{ String(i + 1).padStart(2, '0') }} / {{ String(concepts.length).padStart(2, '0') }}</span>
            <h3 class="mt-3 text-2xl leading-8 font-bold tracking-tight uppercase sm:text-[32px] sm:leading-10">{{ c.title }}</h3>
            <p class="mt-2 text-sm leading-5 opacity-60 sm:text-base sm:leading-6">{{ c.summary }}</p>
          </div>
          <div class="flex items-center justify-between gap-4">
            <span class="text-sm leading-5 opacity-55">{{ c.platform }} · {{ c.year }}</span>
            <span class="proj-arrow" aria-hidden="true">→</span>
          </div>
        </div>
        <ProjectCover :concept="c" :aspect="16 / 10" :lazy="i > 1" class="rounded-[22px]" />
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped>
.ps-card {
  position: sticky;
}
/* --p: насколько карточку накрыла следующая (0…1) */
.ps-inner {
  /* Без прозрачности и размытия: стекло, наложенное на стекло, при прокрутке просвечивает.
     Цвет — заливка стекла поверх фона страницы, световые пятна внутри остаются */
  background-color: #3f327a;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  transform-origin: 50% 0;
  scale: calc(1 - var(--p, 0) * 0.08);
  filter: brightness(calc(1 - var(--p, 0) * 0.25));
  will-change: transform, filter;
}
</style>
