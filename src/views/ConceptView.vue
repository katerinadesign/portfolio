<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import Pill from '@/components/Pill.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { concepts } from '@/data/concepts'

const props = defineProps<{ slug: string }>()

const index = computed(() => concepts.findIndex((c) => c.slug === props.slug))
const concept = computed(() => concepts[index.value])
const next = computed(() => concepts[(index.value + 1) % concepts.length])
</script>

<template>
  <NotFoundView v-if="!concept" />

  <article v-else class="flex flex-col gap-2">
    <section class="flex flex-col gap-8 rounded-[32px] bg-brand p-5 text-white sm:p-6">
      <Pill :to="{ name: 'home', hash: '#concepts' }" medium class="self-start">
        ← Все концепты
      </Pill>
      <div class="flex flex-col gap-4">
        <h1 class="text-[32px] leading-[1.1] font-bold tracking-[-0.02em] sm:text-5xl">
          {{ concept.title }}
        </h1>
        <p class="max-w-[560px] text-base leading-snug font-medium sm:text-xl sm:leading-7">
          {{ concept.summary }}
        </p>
      </div>
      <div class="flex flex-wrap gap-0.5">
        <span class="rounded-full bg-white/15 px-4 py-2.5 text-[13px] font-medium sm:text-sm">UI-концепт</span>
        <span class="rounded-full bg-white/15 px-4 py-2.5 text-[13px] font-medium sm:text-sm">{{ concept.platform }}</span>
        <span class="rounded-full bg-white/15 px-4 py-2.5 text-[13px] font-medium sm:text-sm">{{ concept.year }}</span>
      </div>
    </section>

    <div class="overflow-hidden rounded-[32px]">
      <div
        class="flex h-64 items-center justify-center bg-linear-to-br sm:h-[420px]"
        :class="concept.cover"
      >
        <span class="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-ink/60">
          Главный экран концепта
        </span>
      </div>
    </div>

    <section
      v-for="section in concept.sections"
      :key="section.title"
      class="grid gap-4 rounded-[32px] bg-white p-5 text-ink sm:p-6 md:grid-cols-12"
    >
      <h2 class="text-2xl leading-8 font-semibold md:col-span-4">{{ section.title }}</h2>
      <div class="flex flex-col gap-4 md:col-span-8">
        <p class="text-sm leading-snug font-medium text-ink/70 sm:text-base">{{ section.text }}</p>
        <div class="flex h-48 items-center justify-center rounded-2xl bg-surface text-xs font-medium text-ink/40 sm:h-64">
          Изображение
        </div>
      </div>
    </section>

    <RouterLink
      v-if="next && next.slug !== concept.slug"
      :to="{ name: 'concept', params: { slug: next.slug } }"
      class="group flex items-center justify-between gap-4 rounded-[32px] bg-brand p-5 text-white transition hover:brightness-105 sm:p-6"
    >
      <span>
        <span class="block text-[13px] font-medium text-white/70 sm:text-sm">Следующий концепт</span>
        <span class="block text-xl font-bold sm:text-2xl">{{ next.title }}</span>
      </span>
      <span
        class="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-xl text-ink transition group-hover:translate-x-1"
        aria-hidden="true"
      >→</span>
    </RouterLink>
  </article>
</template>
