<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Concept } from '@/data/concepts'

defineProps<{ concept: Concept }>()
</script>

<template>
  <RouterLink
    :to="{ name: 'concept', params: { slug: concept.slug } }"
    class="group flex h-full flex-col gap-4 rounded-[32px] bg-white p-5 text-ink transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:p-6"
  >
    <div>
      <h3 class="text-lg leading-6 font-bold tracking-tight uppercase sm:text-xl">
        {{ concept.title }}
      </h3>
      <p class="mt-1 text-[13px] leading-5 text-ink/60 sm:text-sm">{{ concept.summary }}</p>
    </div>

    <div class="mt-auto overflow-hidden rounded-2xl">
      <div
        class="flex h-56 items-center justify-center bg-linear-to-br transition duration-500 group-hover:scale-[1.03] sm:h-72"
        :class="concept.cover"
      >
        <span class="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-ink/60">
          Обложка концепта
        </span>
      </div>
    </div>
  </RouterLink>
</template>
