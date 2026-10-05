<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import ConceptsSection from '@/components/ConceptsSection.vue'
import AboutSection from '@/components/AboutSection.vue'
</script>

<template>
  <div class="flex flex-col gap-2">
    <HeroSection class="mx-auto w-full max-w-page" />
    <!-- Отступ от первого блока до проектов — 60px (8px gap + 52px) -->
    <ConceptsSection class="mt-[52px]" />
    <AboutSection class="mx-auto w-full max-w-page" />
  </div>
</template>
