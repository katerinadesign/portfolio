<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { ConceptImage } from '@/data/concepts'

/**
 * Обложка концепта: картинка и, если заданы, видео поверх её частей (например, анимации
 * отдельных экранов). Видео играют, только пока видны на экране; при reduced motion —
 * не показываются, остаётся статичная картинка.
 */
const props = defineProps<{ image: ConceptImage; lazy?: boolean }>()

const baseUrl = import.meta.env.BASE_URL
const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const videos = reducedMotion ? [] : (props.image.videos ?? [])

const videoEls = ref<HTMLVideoElement[]>([])
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!videoEls.value.length) return
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const el = entry.target as HTMLVideoElement
      if (entry.isIntersecting) el.play().catch(() => {})
      else el.pause()
    }
  })
  videoEls.value.forEach((el) => observer!.observe(el))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="relative">
    <img
      :src="`${baseUrl}${image.src}`"
      :width="image.width"
      :height="image.height"
      :alt="image.alt"
      :loading="lazy ? 'lazy' : undefined"
      class="block h-auto w-full"
    />
    <!-- Рамка обрезает видео по форме экрана; само видео можно чуть увеличить (scale) -->
    <div
      v-for="video in videos"
      :key="video.src"
      class="absolute overflow-hidden"
      :style="{
        left: `${video.left}%`,
        top: `${video.top}%`,
        width: `${video.width}%`,
        height: `${video.height}%`,
        borderRadius: video.radius,
      }"
    >
      <video
        ref="videoEls"
        :src="`${baseUrl}${video.src}`"
        muted
        loop
        playsinline
        preload="none"
        aria-hidden="true"
        class="block size-full object-cover"
        :style="{ transform: `scale(${video.scale?.x ?? 1}, ${video.scale?.y ?? 1})` }"
      />
    </div>
  </div>
</template>
