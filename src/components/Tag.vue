<script setup lang="ts">
/**
 * Небольшой пастельный тег-«пилюля».
 * `variant` управляет тоном: neutral (бежевый) или accent (розовый).
 */
withDefaults(
  defineProps<{
    label: string
    variant?: 'neutral' | 'accent'
  }>(),
  { variant: 'neutral' },
)
</script>

<template>
  <span class="tag" :class="`tag--${variant}`">{{ label }}</span>
</template>

<style scoped lang="scss">
.tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: $radius-pill;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  white-space: nowrap;
  line-height: 1.4;
  transition: background-color $transition, color $transition;

  &--neutral {
    background-color: $color-beige;
    color: $color-text-muted;
  }

  &--accent {
    background-color: $color-sand-soft;
    color: $color-accent-text;
  }
}
</style>
