<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import Pill from '@/components/Pill.vue'
import { profile } from '@/data/profile'

const baseUrl = import.meta.env.BASE_URL

// Меняющееся слово в заголовке — лаймовым текстом
const WORDS = ['e-commerce', 'B2C', 'B2B', 'digital health']
const wordIdx = ref(0)
const wordTimer = window.setInterval(() => (wordIdx.value = (wordIdx.value + 1) % WORDS.length), 2400)

onBeforeUnmount(() => clearInterval(wordTimer))
</script>

<template>
  <section
    class="relative flex flex-col justify-between gap-[75px] rounded-[32px] glass p-8 text-white sm:px-12 sm:py-14"
  >
    <div class="flex flex-col gap-6 sm:gap-8">
      <h1 class="text-[26px] leading-[1.1] font-bold tracking-[-0.02em] sm:text-[32px] sm:leading-[30px]">
        Product Designer с 3+ годами опыта в проектировании
        <span class="hero-word">
          <Transition name="word" mode="out-in">
            <span :key="WORDS[wordIdx]" class="inline-block text-accent">{{ WORDS[wordIdx] }}</span>
          </Transition>
        </span>
      </h1>
      <p class="text-base leading-snug font-medium sm:text-xl sm:leading-7">
        <!-- Переносы строк заданы вручную от планшета; на телефоне текст переносится сам -->
        Mindset (120K MAU), Staylo и&nbsp;<span class="whitespace-nowrap">e-commerce</span> — конверсия 18→27%,<br class="hidden sm:inline" />
        <span class="whitespace-nowrap">−22% отказов на checkout,</span>
        использование фильтров 9→34%,<br class="hidden sm:inline" />
        <span class="whitespace-nowrap">−40% времени сборки экранов</span>
      </p>
    </div>

    <!-- Почта и hh прижаты вправо -->
    <div class="flex flex-wrap items-center justify-between gap-1">
      <!-- На телефоне группа «растворяется»: Телеграм — во всю ширину, резюме, @ и hh — строкой ниже -->
      <div class="contents sm:flex sm:flex-wrap sm:gap-1">
        <Pill large class="w-full justify-center sm:w-auto" :href="profile.telegramUrl" variant="accent" target="_blank" rel="noopener noreferrer">
          Написать в Телеграм
        </Pill>
        <Pill large :href="`${baseUrl}cv.pdf`" download>Моё резюме</Pill>
      </div>
      <!-- ml-auto — остаются справа, даже когда на узком экране переносятся на новую строку -->
      <div class="ml-auto flex gap-1">
        <Pill large square :href="`mailto:${profile.email}`" :aria-label="`Написать на почту ${profile.email}`">
          @
        </Pill>
        <Pill large square :href="profile.hhUrl" target="_blank" rel="noopener noreferrer" aria-label="Резюме на hh.ru">
          hh
        </Pill>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-word {
  display: inline-block;
}
.word-enter-active,
.word-leave-active {
  transition:
    opacity 0.3s,
    translate 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.3s;
}
.word-enter-from {
  opacity: 0;
  translate: 0 0.4em;
  filter: blur(6px);
}
.word-leave-to {
  opacity: 0;
  translate: 0 -0.4em;
  filter: blur(6px);
}
</style>
