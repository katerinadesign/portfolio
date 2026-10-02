<script setup lang="ts">
import ConceptCard from '@/components/ConceptCard.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import { concepts } from '@/data/concepts'
</script>

<template>
  <section id="concepts">
    <SectionTitle>UI-концепты</SectionTitle>

    <!-- От планшета: строки 8/4 по 12-колоночной сетке, на мобильном — одна колонка -->
    <div class="grid grid-cols-1 gap-2 md:grid-cols-12">
      <ConceptCard
        v-for="(concept, i) in concepts"
        :key="concept.slug"
        :concept="concept"
        :class="i % 2 === 0 ? 'md:col-span-8' : 'md:col-span-4'"
      />
    </div>
  </section>
</template>
