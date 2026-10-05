<script setup lang="ts">
import ConceptCard from '@/components/ConceptCard.vue'
import { concepts } from '@/data/concepts'
</script>

<template>
  <section id="concepts" aria-label="Проекты">
    <!--
      На всю ширину страницы. От планшета — две колонки в пропорции ~1.6 : 1
      (широкая карточка слева, узкая справа), на мобильном — одна колонка.
    -->
    <div class="grid grid-cols-1 gap-2 md:grid-cols-[1.6fr_1fr]">
      <ConceptCard v-for="concept in concepts" :key="concept.slug" :concept="concept" />
    </div>
  </section>
</template>
