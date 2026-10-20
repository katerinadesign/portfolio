<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { ConceptImage } from '@/data/concepts'

/**
 * Обложка концепта: картинка и, если задано, видео поверх её части (например, анимация
 * одного из экранов). Видео играет, только пока видно на экране; при reduced motion —
 * не показывается, остаётся статичная картинка.
 */
const props = defineProps<{ image: ConceptImage; lazy?: boolean }>()

const baseUrl = import.meta.env.BASE_URL
const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const showVideo = Boolean(props.image.video) && !reducedMotion

const video = ref<HTMLVideoElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  const el = video.value
  if (!el) return
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) el.play().catch(() => {})
    else el.pause()
  })
  observer.observe(el)
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
      v-if="showVideo && image.video"
      class="absolute overflow-hidden"
      :style="{
        left: `${image.video.left}%`,
        top: `${image.video.top}%`,
        width: `${image.video.width}%`,
        height: `${image.video.height}%`,
        borderRadius: image.video.radius,
      }"
    >
      <video
        ref="video"
        :src="`${baseUrl}${image.video.src}`"
        muted
        loop
        playsinline
        preload="none"
        aria-hidden="true"
        class="block size-full object-cover"
        :style="{ transform: `scale(${image.video.scale?.x ?? 1}, ${image.video.scale?.y ?? 1})` }"
      />
    </div>
  </div>
</template>
