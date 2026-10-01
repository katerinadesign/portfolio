<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue'
import type { Project } from '@/types/project'

defineProps<{ projects: Project[] }>()
</script>

<template>
  <div class="grid">
    <ProjectCard
      v-for="project in projects"
      :key="project.slug"
      :project="project"
    />
  </div>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  gap: $gap;
  // Каждая карточка на своей строке — одна колонка на всю ширину
  grid-template-columns: 1fr;
}

@media (max-width: $bp-mobile) {
  .grid {
    gap: 16px;
  }
}
</style>
