<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import DotGrid from '@/components/vue-bits/DotGrid.vue'

/**
 * Фон из серых точек 2px и курсор-круг.
 * Точки вокруг курсора увеличиваются и становятся фиолетовыми ступенями по кольцам
 * (SCALE_STEPS): 3 → 1.5 → 1.2 → 1 от activeScale; под курсором точки перекрываются.
 * Зона радиусом ZONE_R плавно следует за курсором с небольшим отставанием (follow).
 * Там, где прошла мышь, точки остаются увеличенными и гаснут за trail-fade мс.
 * На тач-устройствах и при reduced motion — обычный курсор и статичные точки.
 */
const GRID_STEP = 24 // шаг сетки точек (dot-size + gap)
// Кольца вокруг курсора: внешний радиус каждого (px). Первое — 26px, чтобы в него попадали
// точка под курсором и 4 соседние (шаг сетки 24): они вырастают до ~29px и слегка перекрываются
const RING_EDGES = [26, 40, 52, 64]
// Масштаб точек по кольцам (доля от active-scale)
const SCALE_STEPS = [3, 1.5, 1.2, 1]
const ZONE_R = RING_EDGES[RING_EDGES.length - 1] // радиус зоны вокруг курсора

const enabled =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

const zoneRadius = ref(0)
const cursor = ref<HTMLDivElement | null>(null)

let cleanup: (() => void) | null = null

onMounted(() => {
  const cursorEl = cursor.value
  if (!enabled || !cursorEl) return

  const cursorX = gsap.quickTo(cursorEl, 'x', { duration: 0.15, ease: 'power3.out' })
  const cursorY = gsap.quickTo(cursorEl, 'y', { duration: 0.15, ease: 'power3.out' })

  const zone = { r: 0 }
  let zoneTween: gsap.core.Tween | null = null
  const setZone = (r: number, duration: number, ease: string) => {
    zoneTween?.kill()
    zoneTween = gsap.to(zone, { r, duration, ease, onUpdate: () => (zoneRadius.value = zone.r) })
  }

  let visible = false

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    cursorX(e.clientX)
    cursorY(e.clientY)
    gsap.to(cursorEl, { autoAlpha: 1, duration: 0.2, overwrite: 'auto' })

    if (!visible) {
      visible = true
      setZone(ZONE_R, 0.3, 'power3.out')
    }
  }

  const onLeave = () => {
    visible = false
    setZone(0, 0.3, 'power2.out')
    gsap.to(cursorEl, { autoAlpha: 0, duration: 0.2, overwrite: 'auto' })
  }

  // Над ссылками и кнопками курсор увеличивается
  const onOver = (e: PointerEvent) => {
    const interactive = (e.target as Element | null)?.closest('a, button')
    gsap.to(cursorEl, { scale: interactive ? 1.8 : 1, duration: 0.25, ease: 'power2.out' })
  }

  document.documentElement.classList.add('custom-cursor')
  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerover', onOver)
  document.documentElement.addEventListener('pointerleave', onLeave)

  cleanup = () => {
    zoneTween?.kill()
    document.documentElement.classList.remove('custom-cursor')
    window.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerover', onOver)
    document.documentElement.removeEventListener('pointerleave', onLeave)
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
    <DotGrid
      :dot-size="2"
      :gap="GRID_STEP - 2"
      base-color="#b4b4bc"
      active-color="#8b6ff0"
      :proximity="zoneRadius"
      :scale-steps="SCALE_STEPS"
      :ring-edges="RING_EDGES"
      :active-scale="5.5"
      :active-alpha="0.2"
      :active-alpha-max="0.55"
      :move-throttle="0"
      :follow="0.25"
      :trail-fade="550"
      :speed-trigger="1200"
      :shock-radius="220"
      :shock-strength="3"
    />
  </div>

  <div
    v-if="enabled"
    ref="cursor"
    class="invisible pointer-events-none fixed top-0 left-0 z-50 -mt-2 -ml-2 size-4 rounded-full border-[1.5px] border-white bg-brand shadow-md shadow-brand/30"
    aria-hidden="true"
  />
</template>

<style>
html.custom-cursor,
html.custom-cursor * {
  cursor: none !important;
}
</style>
