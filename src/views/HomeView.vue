<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ProjectGrid from '@/components/ProjectGrid.vue'
import { useProjectsStore } from '@/stores/projects'

const store = useProjectsStore()
const { projects, projectCount } = storeToRefs(store)
</script>

<template>
  <div class="home">
    <header class="home__intro">
      <h2 class="home__title">Избранные проекты</h2>
      <p class="home__subtitle">
        {{ projectCount }} проекта — от финтеха до e-commerce и wellness.
      </p>
    </header>

    <ProjectGrid :projects="projects" />
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  gap: 28px;

  &__intro {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__title {
    font-size: 1.75rem;
  }

  &__subtitle {
    color: $color-text-muted;
    font-size: 1rem;
  }
}
</style>
