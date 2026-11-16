<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Pill from '@/components/Pill.vue'
import RunnerToggle from '@/components/RunnerToggle.vue'
import { navSections, profile } from '@/data/profile'
import { useActiveSection } from '@/composables/useActiveSection'

const active = useActiveSection(navSections.map((s) => s.id))
const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <header
    class="sticky top-2 z-20 flex items-center justify-between gap-3 rounded-full glass p-2 sm:top-4 sm:p-3"
  >
    <RouterLink
      to="/"
      class="flex shrink-0 items-center gap-2 rounded-full py-1 pr-[11px] pl-1 text-white transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:pr-[21px]"
      :aria-label="`${profile.name} — на главную`"
    >
      <img
        :src="`${baseUrl}images/avatar.png`"
        alt=""
        width="46"
        height="46"
        class="size-[42px] rounded-full object-cover sm:size-[46px]"
      />
      <span class="hidden text-sm leading-5 font-medium sm:inline">{{ profile.name }}</span>
    </RouterLink>

    <!-- Навигация: на телефоне справа, от планшета — ровно по центру шапки -->
    <nav
      class="flex sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
      aria-label="Разделы"
    >
      <Pill
        v-for="section in navSections"
        :key="section.id"
        :to="{ name: 'home', hash: `#${section.id}` }"
        variant="plain"
        medium
        :aria-current="active === section.id ? 'true' : undefined"
      >
        {{ section.label }}
      </Pill>
    </nav>

    <!-- Тогл человечка — справа, вровень с правым краем кнопок главного блока -->
    <RunnerToggle />
  </header>
</template>
