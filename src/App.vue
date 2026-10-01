<script setup lang="ts">
import Layout from '@/components/Layout.vue'
</script>

<template>
  <Layout>
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </Layout>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
