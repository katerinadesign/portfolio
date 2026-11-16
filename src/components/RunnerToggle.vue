<script setup lang="ts">
import { runnerOn, runnerSupported } from '@/composables/useRunner'

/** Тогл в шапке: с человечком у курсора / без. */
</script>

<template>
  <button
    v-if="runnerSupported"
    type="button"
    role="switch"
    class="fx-toggle"
    :class="{ 'is-on': runnerOn }"
    :aria-checked="runnerOn"
    :aria-label="runnerOn ? 'Выключить человечка у курсора' : 'Включить человечка у курсора'"
    :title="runnerOn ? 'Без человечка' : 'С человечком'"
    @click="runnerOn = !runnerOn"
  >
    <span class="fx-toggle-knob">
      <svg viewBox="0 0 28 40" width="14" height="20" aria-hidden="true">
        <line x1="14" y1="14" x2="14" y2="25" stroke-width="6" />
        <line x1="14" y1="16" x2="8" y2="23" />
        <line x1="14" y1="16" x2="20" y2="23" />
        <line x1="14" y1="25" x2="9" y2="37" />
        <line x1="14" y1="25" x2="19" y2="37" />
        <circle cx="14" cy="7.5" r="6" stroke="none" />
      </svg>
    </span>
  </button>
</template>

<style scoped>
.fx-toggle {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  width: 96px;
  height: 50px; /* как у кнопок в шапке */
  padding: 4px;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.15);
  transition: background-color 0.25s;
}
.fx-toggle:hover {
  background: rgb(255 255 255 / 0.25);
}
.fx-toggle:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
.fx-toggle-knob {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.85);
  transition:
    translate 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    background-color 0.25s;
}
.fx-toggle.is-on .fx-toggle-knob {
  translate: 46px 0;
  background: var(--color-accent);
}
.fx-toggle-knob svg {
  overflow: visible;
  fill: var(--color-ink);
  stroke: var(--color-ink);
  stroke-width: 3.6;
  stroke-linecap: round;
  opacity: 0.35;
  transition: opacity 0.25s;
}
.fx-toggle.is-on .fx-toggle-knob svg {
  opacity: 1;
}
/* На узком экране в шапке нет места — тогла нет */
@media (max-width: 639px) {
  .fx-toggle {
    display: none;
  }
}
@media (min-width: 640px) {
  .fx-toggle {
    width: 104px;
    height: 54px;
  }
  .fx-toggle-knob {
    width: 46px;
    height: 46px;
  }
  .fx-toggle.is-on .fx-toggle-knob {
    translate: 50px 0;
  }
}
</style>
