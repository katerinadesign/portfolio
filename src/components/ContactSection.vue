<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <!-- Финальный блок: фиолетовая карточка с призывом написать -->
  <section
    id="contacts"
    aria-label="Контакты"
    class="flex flex-col items-center gap-7 rounded-[32px] bg-brand px-5 py-10 text-center text-white sm:gap-9 sm:py-12"
  >
    <h2 class="text-[32px] leading-[1.05] font-medium tracking-[-0.03em] sm:text-5xl">
      Открыта к новым проектам и предложениям
    </h2>

    <a
      :href="profile.telegramUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="flex h-14 w-full max-w-[300px] items-center justify-center rounded-full bg-accent text-base font-bold text-ink transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      Написать в TG
    </a>
  </section>
</template>
