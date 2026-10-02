<script setup lang="ts">
import Layout from '@/components/Layout.vue'
</script>

<template>
  <Layout>
    <RouterView v-slot="{ Component }">
      <Transition
        mode="out-in"
        enter-active-class="transition-opacity duration-250"
        leave-active-class="transition-opacity duration-250"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <component :is="Component" />
      </Transition>
    </RouterView>
  </Layout>
</template>
