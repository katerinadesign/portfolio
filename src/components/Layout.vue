<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import DotsBackground from '@/components/DotsBackground.vue'
import { vTypograph } from '@/directives/typograph'
</script>

<template>
  <DotsBackground />

  <!--
    Контейнер на всю ширину: шапка и большинство блоков — в колонке max-w-page,
    сетка концептов растягивается на всю ширину (с отступами по краям).
  -->
  <div v-typograph class="flex min-h-screen flex-col gap-2 px-2 pt-2 pb-10 sm:px-4 sm:pt-4 lg:px-10">
    <SiteHeader class="mx-auto w-full max-w-page" />
    <main class="flex flex-col gap-2">
      <slot />
    </main>
  </div>
</template>
