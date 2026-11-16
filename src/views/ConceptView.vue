<script setup lang="ts">
import { computed } from 'vue'
import Pill from '@/components/Pill.vue'
import ConceptStage from '@/components/ConceptStage.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { concepts as allConcepts } from '@/data/concepts'

const props = defineProps<{ slug: string }>()

// Проекты с отдельной страницей кейса (Mindset) здесь не показываются
const concepts = allConcepts.filter((c) => !c.route)
const concept = computed(() => concepts.find((c) => c.slug === props.slug))
</script>

<template>
  <NotFoundView v-if="!concept" />

  <article v-else class="mx-auto flex w-full max-w-[1440px] flex-col gap-2">
    <!-- О проекте: название и описание -->
    <section class="relative rounded-[32px] glass p-6 text-white sm:p-10">
      <div class="flex flex-col gap-8">
        <Pill :to="{ name: 'home', hash: '#projects' }" medium class="self-start">← Все проекты</Pill>
        <div class="flex flex-col gap-4">
          <h1 class="text-[36px] leading-[1.05] font-bold tracking-[-0.02em] sm:text-[56px]">{{ concept.title }}</h1>
          <p class="max-w-[560px] text-base leading-snug font-medium opacity-85 sm:text-xl sm:leading-7">
            {{ concept.intro ?? concept.summary }}
          </p>
        </div>
      </div>
    </section>

    <!-- Экраны концепта — на всю ширину -->
    <ConceptStage v-if="concept.image" :image="concept.image" />
    <div
      v-else
      class="flex h-64 w-full items-center justify-center rounded-[32px] bg-linear-to-br brightness-75 sm:h-[560px]"
      :class="concept.cover"
    >
      <span class="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-ink/60">Главный экран концепта</span>
    </div>

    <!-- Дополнительные экраны — без подписей -->
    <ConceptStage v-for="shot in concept.gallery" :key="shot.src" :image="shot" lazy />

    <section
      v-for="section in concept.sections"
      :key="section.title"
      class="relative grid gap-4 rounded-[32px] glass p-6 text-white sm:p-10 md:grid-cols-12"
    >
      <h2 class="text-2xl leading-8 font-semibold md:col-span-4">{{ section.title }}</h2>
      <p class="text-sm leading-snug font-medium opacity-80 sm:text-base md:col-span-8">{{ section.text }}</p>
    </section>
  </article>
</template>

