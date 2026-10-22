<script setup lang="ts">
import MindsetCase from '@/components/cases/mindset/MindsetCase.vue'

// Отдельная страница кейса Mindset (не шаблон концепта).
// Корень — один элемент, без комментариев рядом: иначе ломается переход между страницами (Transition)
</script>

<template>
  <article class="flex w-full flex-col gap-2">
    <MindsetCase />
  </article>
</template>
