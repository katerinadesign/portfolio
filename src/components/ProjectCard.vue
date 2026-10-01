<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Tag from '@/components/Tag.vue'
import type { Project } from '@/types/project'

defineProps<{ project: Project }>()
</script>

<template>
  <RouterLink
    class="card"
    :to="{ name: 'project', params: { slug: project.slug } }"
  >
    <div class="card__media">
      <img
        class="card__image"
        :src="project.cover"
        :alt="project.coverAlt"
        loading="lazy"
      />
    </div>
    <div class="card__body">
      <h3 class="card__title">{{ project.title }}</h3>
      <p class="card__summary">{{ project.summary }}</p>
      <div class="card__tags">
        <Tag
          v-for="tag in project.tags"
          :key="tag.id"
          :label="tag.label"
        />
      </div>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.card {
  // Desktop: горизонтальная раскладка — изображение слева, текст справа
  display: grid;
  grid-template-columns: 300px 1fr;
  background-color: $color-white;
  border: 1px solid $color-border;
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: $shadow-card;
  transition: transform $transition, box-shadow $transition,
    border-color $transition;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-card-hover;
    border-color: $color-sand;

    .card__image {
      transform: scale(1.04);
    }
  }

  &__media {
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background-color: $color-beige;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding: 28px;
  }

  &__title {
    font-size: 1.3rem;
  }

  &__summary {
    font-size: 0.95rem;
    color: $color-text-muted;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
  }
}

// Планшет / мобильный: карточка сворачивается в вертикаль
@media (max-width: $bp-tablet) {
  .card {
    grid-template-columns: 1fr;

    &__body {
      padding: 20px;
    }

    &__title {
      font-size: 1.15rem;
    }
  }
}
</style>
