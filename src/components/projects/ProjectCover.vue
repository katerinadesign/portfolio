<script setup lang="ts">
import { computed } from 'vue'
import ConceptCover from '@/components/ConceptCover.vue'
import type { Concept } from '@/data/concepts'

/**
 * Обложка проекта в рамке с заданными пропорциями (aspect = ширина / высота).
 * У всех проектов рамка одинаковая; картинка заполняет её целиком и обрезается по краям
 * (как object-fit: cover). Масштабируется вся обложка вместе с видео поверх экранов,
 * поэтому видео не съезжают. Пока у проекта нет картинки — градиент-заглушка.
 */
const props = withDefaults(defineProps<{ concept: Concept; aspect?: number; lazy?: boolean }>(), {
  aspect: 4 / 3,
  lazy: true,
})

// Ширина обложки в % рамки, чтобы она закрыла рамку и по ширине, и по высоте
const imageWidth = computed(() => {
  const img = props.concept.image
  if (!img) return 0
  const ratio = img.width / img.height
  return Math.max(1, ratio / props.aspect) * 100
})
</script>

<template>
  <div
    class="relative flex items-center justify-center overflow-hidden"
    :class="concept.image ? 'bg-white' : ['cover-placeholder bg-linear-to-br', concept.cover]"
    :style="{ aspectRatio: aspect }"
  >
    <ConceptCover
      v-if="concept.image"
      :image="concept.image"
      :lazy="lazy"
      class="cover-media shrink-0"
      :style="{ width: `${imageWidth}%` }"
    />
    <span v-else class="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-ink/60">
      Обложка концепта
    </span>
  </div>
</template>
