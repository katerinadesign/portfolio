<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Pill from '@/components/Pill.vue'
import { navSections, profile } from '@/data/profile'
import { useActiveSection } from '@/composables/useActiveSection'

const active = useActiveSection(navSections.map((s) => s.id))
const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <header
    class="sticky top-2 z-20 flex items-center justify-between gap-3 rounded-full bg-brand py-2 pr-2 pl-2 shadow-lg ring-4 shadow-brand/20 ring-surface sm:top-4 sm:px-4 sm:pt-3 sm:pb-[11px]"
  >
    <RouterLink
      to="/"
      class="flex shrink-0 items-center gap-2 rounded-full bg-white py-[11px] pr-[11px] pl-[11px] text-ink transition hover:bg-white/90 sm:pr-[21px] sm:pl-[13px]"
      :aria-label="`${profile.name} — на главную`"
    >
      <img
        :src="`${baseUrl}images/avatar.png`"
        alt=""
        width="32"
        height="32"
        class="size-8 rounded-full"
      />
      <span class="hidden text-sm leading-5 font-medium sm:inline">{{ profile.name }}</span>
    </RouterLink>

    <nav class="flex gap-0.5 overflow-x-auto" aria-label="Разделы">
      <Pill
        v-for="section in navSections"
        :key="section.id"
        :to="{ name: 'home', hash: `#${section.id}` }"
        :variant="active === section.id ? 'accent' : 'ghost'"
        :medium="active !== section.id"
        :aria-current="active === section.id ? 'true' : undefined"
      >
        {{ section.label }}
      </Pill>
    </nav>
  </header>
</template>
