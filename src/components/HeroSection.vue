<script setup lang="ts">
import Pill from '@/components/Pill.vue'
import { profile } from '@/data/profile'

const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <section
    class="flex flex-col justify-between gap-12 rounded-[32px] bg-brand p-5 text-white sm:min-h-[452px] sm:p-6"
  >
    <div class="flex max-w-[488px] flex-col gap-6 sm:gap-8">
      <h1 class="text-[26px] leading-[1.1] font-bold tracking-[-0.02em] sm:text-[32px] sm:leading-[30px]">
        Product Designer с 3+ годами опыта в проектировании e-commerce, B2C и digital health
      </h1>
      <p class="text-base leading-snug font-medium sm:text-xl sm:leading-7">
        Mindset (120K MAU), Staylo и e-commerce — конверсия 18→27%, −22% отказов
        на checkout, использование фильтров 9→34%, −40% времени сборки экранов
      </p>
    </div>

    <div class="flex flex-wrap gap-0.5">
      <Pill :href="profile.telegramUrl" variant="accent" target="_blank" rel="noopener noreferrer">
        Написать в TG
      </Pill>
      <Pill :href="profile.linkedinUrl" target="_blank" rel="noopener noreferrer">LinkedIn</Pill>
      <Pill :href="`${baseUrl}cv.pdf`" download>↓ CV</Pill>
    </div>
  </section>
</template>
