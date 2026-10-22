<script setup lang="ts">
import { computed } from 'vue'
import ConceptCover from '@/components/ConceptCover.vue'
import type { ConceptImage } from '@/data/concepts'

/**
 * Карточка с экранами концепта (шириной до 1040px). У всех карточек одна пропорция «сцены»,
 * а картинка масштабируется так, чтобы область с экранами (image.content) вписалась
 * в сцену — белые поля самой картинки обрезаются, телефоны во всех карточках
 * одинаковой высоты. Вокруг сцены — узкая рамка (padding карточки).
 */
const props = defineProps<{ image: ConceptImage; lazy?: boolean }>()

// Пропорция сцены — по самому широкому набору экранов (Beyond: 1837×1148 px картинки),
// чтобы телефоны во всех карточках были одной высоты
const STAGE_ASPECT = 1.6

const box = computed(() => {
  const { width, height } = props.image
  const c = props.image.content ?? { x: 0, y: 0, w: 100, h: 100 }
  const contentAspect = (c.w * width) / (c.h * height)
  const aspectRatio = `${width} / ${height}`

  // Область экранов шире сцены — вписываем по ширине и центрируем по вертикали
  if (contentAspect > STAGE_ASPECT) {
    return {
      width: `${(100 / c.w) * 100}%`,
      left: `${(-c.x / c.w) * 100}%`,
      top: '50%',
      transform: `translateY(-${c.y + c.h / 2}%)`,
      aspectRatio,
    }
  }
  // Иначе — по высоте, центр области экранов по центру сцены
  return {
    height: `${(100 / c.h) * 100}%`,
    top: `${(-c.y / c.h) * 100}%`,
    left: '50%',
    transform: `translateX(-${c.x + c.w / 2}%)`,
    aspectRatio,
  }
})
</script>

<template>
  <div class="mx-auto w-full max-w-[1040px] overflow-hidden rounded-[32px] bg-white p-3 sm:p-5">
    <div class="relative" :style="{ aspectRatio: STAGE_ASPECT }">
      <div class="absolute" :style="box">
        <ConceptCover :image="image" :lazy="lazy" />
      </div>
    </div>
  </div>
</template>
