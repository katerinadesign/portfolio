<script setup lang="ts">
/**
 * Еле заметные звёздочки на фоне страницы: маленькие точки и несколько «искорок»-крестиков,
 * медленно мерцают с разной задержкой. Слой зафиксирован и не мешает кликам.
 * Положения — из простого генератора с постоянным зерном, чтобы не менялись между перезагрузками.
 */
let seed = 7
const rand = () => {
  seed = (seed * 16807) % 2147483647
  return (seed - 1) / 2147483646
}

const stars = Array.from({ length: 90 }, (_, i) => {
  const sparkle = i % 11 === 0
  return {
    x: rand() * 100,
    y: rand() * 100,
    size: sparkle ? 7 + rand() * 4 : 1 + rand() * 1.6,
    opacity: sparkle ? 0.35 : 0.2 + rand() * 0.35,
    duration: 3 + rand() * 5,
    delay: -rand() * 8,
    sparkle,
  }
})
</script>

<template>
  <div class="starfield" aria-hidden="true">
    <span
      v-for="(s, i) in stars"
      :key="i"
      class="star"
      :class="{ sparkle: s.sparkle }"
      :style="{
        left: `${s.x}%`,
        top: `${s.y}%`,
        width: `${s.size}px`,
        height: `${s.size}px`,
        '--o': s.opacity,
        animationDuration: `${s.duration}s`,
        animationDelay: `${s.delay}s`,
      }"
    />
  </div>
</template>

<style scoped>
.starfield {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}
.star {
  position: absolute;
  border-radius: 50%;
  background: #fff;
  opacity: var(--o);
  animation: twinkle ease-in-out infinite alternate;
}
/* Искорка — четырёхлучевая звёздочка */
.star.sparkle {
  border-radius: 0;
  background: #f4f1ff;
  clip-path: polygon(50% 0, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0 50%, 42% 42%);
}
@keyframes twinkle {
  from {
    opacity: calc(var(--o) * 0.25);
    scale: 0.8;
  }
  to {
    opacity: var(--o);
    scale: 1;
  }
}
@media (prefers-reduced-motion: reduce) {
  .star {
    animation: none;
  }
}
</style>
