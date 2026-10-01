<script setup lang="ts">
import Tag from '@/components/Tag.vue'

/** Теги-навыки, показываемые в меню. */
const skills = ['2 года опыта', 'Figma', 'Adaptive Design', 'B2B', 'B2C']

/** Внешняя ссылка на Telegram. */
const telegramUrl = 'https://t.me/username'

const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__inner">
      <!-- Профиль -->
      <header class="sidebar__profile">
        <RouterLink to="/" class="sidebar__avatar" aria-label="На главную">
          <span>К</span>
        </RouterLink>
        <div>
          <h1 class="sidebar__name">Катя Иванова</h1>
          <p class="sidebar__role">Продуктовый дизайнер</p>
        </div>
      </header>

      <p class="sidebar__about">
        Проектирую спокойные и понятные интерфейсы для веба и мобильных
        приложений. Люблю аккуратные системы, воздух и внимание к деталям.
      </p>

      <!-- Теги-навыки -->
      <section class="sidebar__section" aria-label="Навыки">
        <div class="sidebar__tags">
          <Tag v-for="skill in skills" :key="skill" :label="skill" />
        </div>
      </section>

      <!-- Соцсети -->
      <section class="sidebar__section" aria-label="Контакты">
        <a
          class="sidebar__social"
          :href="telegramUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="sidebar__social-icon" aria-hidden="true">✈</span>
          Telegram
        </a>
      </section>

      <!-- CV -->
      <a class="sidebar__cv" :href="`${baseUrl}cv.pdf`" download>
        Скачать CV
      </a>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  &__inner {
    display: flex;
    flex-direction: column;
    gap: 22px;
    padding: 28px;
    background: linear-gradient(160deg, $color-sand-soft 0%, $color-beige 100%);
    border: 1px solid $color-border-soft;
    border-radius: $radius-lg;
    box-shadow: $shadow-panel;
  }

  &__profile {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  &__avatar {
    display: grid;
    place-items: center;
    width: 52px;
    height: 52px;
    flex-shrink: 0;
    border-radius: $radius-pill;
    background-color: $color-sand;
    color: $color-accent-text-strong;
    font-size: 1.4rem;
    font-weight: 600;
    transition: transform $transition;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__name {
    font-size: 1.2rem;
  }

  &__role {
    margin-top: 2px;
    font-size: 0.9rem;
    color: $color-text-muted;
  }

  &__about {
    font-size: 0.925rem;
    color: $color-text-muted;
  }

  &__section {
    padding-top: 4px;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__social {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 16px;
    border-radius: $radius-pill;
    background-color: $color-white;
    border: 1px solid $color-border;
    font-size: 0.9rem;
    font-weight: 500;
    color: $color-text;
    transition: background-color $transition, border-color $transition,
      transform $transition;

    &:hover {
      background-color: $color-sand-soft;
      border-color: $color-taupe;
      transform: translateY(-1px);
    }
  }

  &__social-icon {
    color: $color-accent-text;
  }

  &__cv {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 20px;
    border-radius: $radius-md;
    background-color: $color-sand;
    color: $color-accent-text-strong;
    font-weight: 600;
    font-size: 0.95rem;
    transition: background-color $transition, box-shadow $transition,
      transform $transition;

    &:hover {
      background-color: $color-taupe;
      box-shadow: $shadow-card;
      transform: translateY(-1px);
    }
  }
}

// Планшет / мобильный: меню становится горизонтальной шапкой
@media (max-width: $bp-tablet) {
  .sidebar__inner {
    padding: 22px;
    gap: 18px;
  }
}
</style>
