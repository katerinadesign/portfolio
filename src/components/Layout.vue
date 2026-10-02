<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import DotsBackground from '@/components/DotsBackground.vue'
</script>

<template>
  <DotsBackground />

  <div class="mx-auto flex min-h-screen max-w-[932px] flex-col gap-2 px-2 pt-2 pb-10 sm:px-4 sm:pt-4">
    <SiteHeader />
    <main class="flex flex-col gap-2">
      <slot />
    </main>
  </div>
</template>
