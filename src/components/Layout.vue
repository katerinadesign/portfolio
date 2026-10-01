<script setup lang="ts">
import SidebarMenu from '@/components/SidebarMenu.vue'

/**
 * Общая раскладка:
 * - desktop: меню фиксировано слева, контент справа с отступом;
 * - tablet/mobile: меню сверху обычным блоком, контент под ним.
 */
</script>

<template>
  <div class="layout">
    <div class="layout__sidebar">
      <SidebarMenu />
    </div>
    <main class="layout__content">
      <div class="layout__content-inner">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.layout {
  min-height: 100vh;
  padding: $gap;

  &__sidebar {
    position: fixed;
    top: $gap;
    left: $gap;
    width: $sidebar-width;
    // Прокрутка внутри меню, если контента много
    max-height: calc(100vh - #{$gap} * 2);
    overflow-y: auto;
  }

  &__content {
    // Освобождаем место под фиксированное меню
    margin-left: calc(#{$sidebar-width} + #{$gap} * 2);
  }

  &__content-inner {
    max-width: $content-max;
  }
}

// Планшет и мобильный: меню сверху обычным потоком
@media (max-width: $bp-tablet) {
  .layout {
    padding: 16px;

    &__sidebar {
      position: static;
      width: auto;
      max-height: none;
      overflow: visible;
      margin-bottom: 20px;
    }

    &__content {
      margin-left: 0;
    }
  }
}
</style>
