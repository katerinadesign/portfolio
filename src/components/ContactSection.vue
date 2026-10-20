<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <!-- Финальный блок: белая рамка, внутри фиолетовая карточка с призывом написать -->
  <section id="contacts" class="rounded-[40px] bg-white p-2.5 shadow-xl shadow-brand/10">
    <div class="flex flex-col items-center gap-7 rounded-[32px] bg-brand px-5 py-10 text-center text-white sm:gap-9 sm:py-12">
      <span class="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-ink shadow-lg shadow-ink/15">
        Контакты
      </span>

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
    </div>
  </section>
</template>
