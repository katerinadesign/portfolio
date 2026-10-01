<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Tag from '@/components/Tag.vue'
import type { Project } from '@/types/project'

defineProps<{ project: Project }>()
</script>

<template>
  <article class="detail">
    <RouterLink class="detail__back" to="/">
      <span aria-hidden="true">←</span> К списку проектов
    </RouterLink>

    <header class="detail__header">
      <div class="detail__meta">
        <span>{{ project.year }}</span>
        <span class="detail__dot" aria-hidden="true">•</span>
        <span>{{ project.role }}</span>
      </div>
      <h1 class="detail__title">{{ project.title }}</h1>
      <p class="detail__summary">{{ project.summary }}</p>
      <div class="detail__tags">
        <Tag
          v-for="tag in project.tags"
          :key="tag.id"
          :label="tag.label"
          variant="accent"
        />
      </div>
    </header>

    <div class="detail__blocks">
      <section
        v-for="block in project.blocks"
        :key="block.id"
        class="block"
        :class="`block--${block.layout}`"
      >
        <div class="block__media">
          <img
            class="block__image"
            :src="block.image"
            :alt="block.imageAlt"
            loading="lazy"
          />
        </div>
        <div class="block__text">
          <h2 v-if="block.title" class="block__title">{{ block.title }}</h2>
          <p class="block__body">{{ block.text }}</p>
        </div>
      </section>
    </div>

    <footer class="detail__footer">
      <RouterLink class="detail__back-btn" to="/">
        <span aria-hidden="true">←</span> Вернуться к проектам
      </RouterLink>
    </footer>
  </article>
</template>

<style scoped lang="scss">
.detail {
  display: flex;
  flex-direction: column;
  gap: 40px;

  &__back {
    align-self: flex-start;
    font-size: 0.9rem;
    color: $color-text-muted;
    transition: color $transition;

    &:hover {
      color: $color-accent-text;
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: 14px;
    max-width: 640px;
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    color: $color-text-soft;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  &__title {
    font-size: 2.25rem;
  }

  &__summary {
    font-size: 1.05rem;
    color: $color-text-muted;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
  }

  &__blocks {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &__footer {
    padding-top: 8px;
    border-top: 1px solid $color-border;
  }

  &__back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    padding: 12px 22px;
    border-radius: $radius-md;
    background-color: $color-sand-soft;
    color: $color-accent-text-strong;
    font-weight: 600;
    font-size: 0.95rem;
    transition: background-color $transition, transform $transition;

    &:hover {
      background-color: $color-sand;
      transform: translateY(-1px);
    }
  }
}

.block {
  display: grid;
  gap: 24px;
  align-items: center;

  // Текст рядом с изображением
  &--side {
    grid-template-columns: 1.3fr 1fr;
  }

  // Текст под изображением
  &--below {
    grid-template-columns: 1fr;
  }

  &__media {
    overflow: hidden;
    border-radius: $radius-lg;
    border: 1px solid $color-border;
    background-color: $color-beige;
    box-shadow: $shadow-card;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__title {
    font-size: 1.35rem;
  }

  &__body {
    font-size: 1rem;
    color: $color-text-muted;
  }
}

@media (max-width: $bp-tablet) {
  .detail__title {
    font-size: 1.9rem;
  }

  .block--side {
    // На узких экранах любой блок — в одну колонку
    grid-template-columns: 1fr;
  }
}
</style>
