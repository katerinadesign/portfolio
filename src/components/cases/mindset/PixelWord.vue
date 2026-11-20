<script setup lang="ts">
import { computed } from 'vue'

/**
 * Строчные кириллические буквы точками в сетке шрифта Doto (у него нет кириллицы).
 * Сетка как у Doto: ячейка 0.1em, квадратная точка 0.09em, строчная буква 5×5 точек,
 * шаг букв 0.6em, низ на базовой линии. Цвет — currentColor.
 */
const props = defineProps<{ text: string }>()

const GLYPHS: Record<string, string[]> = {
  м: ['#...#', '##.##', '#.#.#', '#...#', '#...#'],
  и: ['#...#', '#..##', '#.#.#', '##..#', '#...#'],
  н: ['#...#', '#...#', '#####', '#...#', '#...#'],
}

// Координаты в сотых долях em
const dots = computed(() =>
  [...props.text].flatMap((ch, i) =>
    (GLYPHS[ch] ?? []).flatMap((row, r) =>
      [...row].flatMap((cell, c) => (cell === '#' ? [{ x: i * 60 + c * 10 + 0.5, y: r * 10 + 0.5 }] : [])),
    ),
  ),
)
const width = computed(() => props.text.length * 60 - 10)
</script>

<template>
  <svg
    class="inline-block h-[0.5em] align-baseline"
    :style="{ width: `${width / 100}em` }"
    :viewBox="`0 0 ${width} 50`"
    fill="currentColor"
    role="img"
    :aria-label="text"
  >
    <rect v-for="(d, i) in dots" :key="i" :x="d.x" :y="d.y" width="9" height="9" />
  </svg>
</template>
