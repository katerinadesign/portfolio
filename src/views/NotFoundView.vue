<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="not-found">
    <div class="not-found__badge" aria-hidden="true">☁</div>
    <h1 class="not-found__title">Проект не найден</h1>
    <p class="not-found__text">
      Возможно, ссылка устарела или проект ещё не опубликован.
    </p>
    <RouterLink class="not-found__link" to="/">
      <span aria-hidden="true">←</span> К списку проектов
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
  padding: 72px 24px;
  background-color: $color-white;
  border: 1px solid $color-border;
  border-radius: $radius-lg;
  box-shadow: $shadow-card;

  &__badge {
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    border-radius: $radius-pill;
    background-color: $color-sand-soft;
    font-size: 1.8rem;
  }

  &__title {
    font-size: 1.6rem;
  }

  &__text {
    color: $color-text-muted;
    max-width: 360px;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    padding: 12px 22px;
    border-radius: $radius-md;
    background-color: $color-sand;
    color: $color-accent-text-strong;
    font-weight: 600;
    transition: background-color $transition, transform $transition;

    &:hover {
      background-color: $color-taupe;
      transform: translateY(-1px);
    }
  }
}
</style>
