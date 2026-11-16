<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

/**
 * Кнопка-«пилюля» из макета.
 * Рендерится как RouterLink (`to`), внешняя ссылка (`href`) или кнопка.
 * - ghost — полупрозрачная на фиолетовом фоне;
 * - accent — лаймовая, для главного действия и активного пункта;
 * - light — белая;
 * - plain — без подложки, только белый текст и узкие поля (ссылки в шапке).
 * `square` — круглая кнопка под один значок или пару букв (той же высоты, что обычная).
 * `large` — крупная кнопка (для главного блока).
 */
const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    href?: string
    variant?: 'ghost' | 'accent' | 'light' | 'plain'
    medium?: boolean
    square?: boolean
    large?: boolean
  }>(),
  { variant: 'ghost' },
)

const variants = {
  ghost: 'bg-white/15 text-white hover:bg-white/25',
  accent: 'bg-accent text-ink hover:brightness-95',
  light: 'bg-white text-ink hover:bg-white/90',
  plain: 'text-white hover:opacity-80',
}

const classes = computed(() => [
  'inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full text-[13px] leading-5 transition',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
  props.large ? 'sm:text-base' : 'sm:text-sm',
  // На телефоне крупная кнопка того же размера, что обычная — чтобы кнопки помещались в строку
  props.large
    ? props.square
      ? 'size-[50px] justify-center sm:size-[64px]'
      : 'px-[19px] py-[15px] sm:px-8 sm:py-[22px]'
    : props.square
      ? 'size-[50px] justify-center sm:size-[54px]'
      : props.variant === 'plain'
        ? 'px-2 py-[15px] sm:px-2.5 sm:py-[17px]'
        : 'px-[19px] py-[15px] sm:px-[21px] sm:py-[17px]',
  props.medium ? 'font-medium' : 'font-bold',
  variants[props.variant],
])
</script>

<template>
  <RouterLink v-if="to" :to="to" :class="classes"><slot /></RouterLink>
  <a v-else-if="href" :href="href" :class="classes"><slot /></a>
  <button v-else type="button" :class="classes"><slot /></button>
</template>
