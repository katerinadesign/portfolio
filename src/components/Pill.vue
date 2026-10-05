<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

/**
 * Кнопка-«пилюля» из макета.
 * Рендерится как RouterLink (`to`), внешняя ссылка (`href`) или кнопка.
 * - ghost — полупрозрачная на фиолетовом фоне;
 * - accent — лаймовая, для главного действия и активного пункта;
 * - light — белая.
 */
const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    href?: string
    variant?: 'ghost' | 'accent' | 'light'
    medium?: boolean
  }>(),
  { variant: 'ghost' },
)

const variants = {
  ghost: 'bg-white/15 text-white hover:bg-white/25',
  accent: 'bg-accent text-ink hover:brightness-95',
  light: 'bg-white text-ink hover:bg-white/90',
}

const classes = computed(() => [
  'inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-[19px] py-[15px] text-[13px] leading-5 transition',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
  'sm:px-[21px] sm:py-[17px] sm:text-sm',
  props.medium ? 'font-medium' : 'font-bold',
  variants[props.variant],
])
</script>

<template>
  <RouterLink v-if="to" :to="to" :class="classes"><slot /></RouterLink>
  <a v-else-if="href" :href="href" :class="classes"><slot /></a>
  <button v-else type="button" :class="classes"><slot /></button>
</template>
