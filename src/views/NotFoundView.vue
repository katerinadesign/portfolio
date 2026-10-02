<script setup lang="ts">
import Pill from '@/components/Pill.vue'
</script>

<template>
  <section class="flex flex-col items-center gap-6 rounded-[32px] bg-brand px-6 py-20 text-center text-white">
    <h1 class="text-[32px] leading-10 font-bold tracking-[-0.02em]">Страница не найдена</h1>
    <p class="text-base font-medium text-white/80">Возможно, ссылка устарела.</p>
    <Pill to="/" variant="accent">← На главную</Pill>
  </section>
</template>
