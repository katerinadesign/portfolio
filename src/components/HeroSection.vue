<script setup lang="ts">
import Pill from '@/components/Pill.vue'
import { profile } from '@/data/profile'

const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <section
    class="flex flex-col justify-between gap-[150px] rounded-[32px] bg-brand p-5 text-white sm:p-6"
  >
    <div class="flex flex-col gap-6 sm:gap-8">
      <h1 class="text-[26px] leading-[1.1] font-bold tracking-[-0.02em] sm:text-[32px] sm:leading-[30px]">
        Product Designer с 3+ годами опыта в проектировании <span class="whitespace-nowrap">e-commerce,</span> B2C и digital health
      </h1>
      <p class="text-base leading-snug font-medium sm:text-xl sm:leading-7">
        <!-- Переносы строк заданы вручную от планшета; на телефоне текст переносится сам -->
        Mindset (120K MAU), Staylo<br class="hidden sm:inline" />
        и&nbsp;<span class="whitespace-nowrap">e-commerce</span> — конверсия 18→27%,
        <span class="whitespace-nowrap">−22% отказов на checkout,</span><br class="hidden sm:inline" />
        использование фильтров 9→34%,<br class="hidden sm:inline" />
        <span class="whitespace-nowrap">−40% времени сборки экранов</span>
      </p>
    </div>

    <!--
      CV прижата вправо. Отрицательный отступ выравнивает её правый край с кнопкой
      «Обо мне» в шапке: внутренний отступ шапки меньше, чем у этого блока
      (8 против 20px на телефоне, 16 против 24px от планшета)
    -->
    <div class="-mr-3 flex flex-wrap items-center justify-between gap-0.5 sm:-mr-2">
      <div class="flex flex-wrap gap-0.5">
        <Pill :href="profile.telegramUrl" variant="accent" target="_blank" rel="noopener noreferrer">
          Написать в TG
        </Pill>
        <Pill :href="profile.linkedinUrl" target="_blank" rel="noopener noreferrer">LinkedIn</Pill>
      </div>
      <Pill :href="`${baseUrl}cv.pdf`" download>↓ CV</Pill>
    </div>
  </section>
</template>
