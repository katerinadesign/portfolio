<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ConceptCover from '@/components/ConceptCover.vue'
import { conceptLink, type Concept } from '@/data/concepts'

defineProps<{ concept: Concept }>()
</script>

<template>
  <!--
    Ссылка на страницу концепта растянута на всю карточку (after:absolute) и лежит
    поверх обложки (after:z-10), поэтому карточка кликается в любом месте
  -->
  <article
    class="group relative flex h-full flex-col gap-4 rounded-[32px] bg-white p-5 text-ink transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/15 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-brand sm:p-6"
  >
    <div>
      <h3 class="text-lg leading-6 font-bold tracking-tight uppercase sm:text-xl">
        <RouterLink
          :to="conceptLink(concept)"
          class="outline-none after:absolute after:inset-0 after:z-10 after:rounded-[32px]"
        >
          {{ concept.title }}
        </RouterLink>
      </h3>
      <p v-if="concept.summary" class="mt-1 text-[13px] leading-5 text-ink/60 sm:text-sm">{{ concept.summary }}</p>
    </div>

    <div class="mt-auto overflow-hidden rounded-2xl">
      <ConceptCover
        v-if="concept.image"
        :image="concept.image"
        lazy
        class="transition duration-500 group-hover:scale-[1.02]"
      />
      <div
        v-else
        class="flex h-56 items-center justify-center bg-linear-to-br transition duration-500 group-hover:scale-[1.03] sm:h-72 lg:h-[420px]"
        :class="concept.cover"
      >
        <span class="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-ink/60">
          Обложка концепта
        </span>
      </div>
    </div>
  </article>
</template>
