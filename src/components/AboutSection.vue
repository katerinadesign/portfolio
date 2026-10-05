<script setup lang="ts">
import { ref } from 'vue'
import Pill from '@/components/Pill.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import { profile } from '@/data/profile'

const baseUrl = import.meta.env.BASE_URL

const results = [
  'Увеличила конверсию в первую запись с 18% до 27% в приложении онлайн-консультаций Mindset, переработав сценарий выбора специалиста на основе продуктовой аналитики и 12 пользовательских интервью',
  'Снизила отказы на checkout на 22% и увеличила конверсию из карточки в бронь с 4,1% до 5,3% в сервисе краткосрочной аренды Staylo после UX-аудита и переработки сценария бронирования',
  'Снизила количество брошенных корзин на 17% и увеличила конверсию из корзины в заказ на 9% в Tamir Market, сократив checkout с 5 до 3 шагов и добавив гостевое оформление заказа',
  'Увеличила использование фильтров с 9% до 34% и снизила долю пустых поисковых выдач с 12% до 4%, переработав каталог и поиск мобильного приложения Tamir Market',
  'Сократила время сборки новых экранов примерно на 40% и количество дизайн-правок на ревью в 2 раза, систематизировав дизайн-систему студии и синхронизировав компоненты в Figma со Storybook',
]

const copied = ref(false)

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    // Буфер обмена недоступен (например, не https) — открываем почтовый клиент
    window.location.href = `mailto:${profile.email}`
  }
}
</script>

<template>
  <section id="about">
    <SectionTitle>Обо мне</SectionTitle>

    <div class="flex flex-col gap-2">
      <div
        class="flex flex-col justify-between gap-8 rounded-[32px] bg-brand p-5 text-white sm:min-h-[258px] sm:p-6"
      >
        <p class="text-base leading-snug font-medium sm:text-xl sm:leading-7">
          Веду продуктовые задачи end-to-end, работаю с продуктовыми метриками:
          конверсией между этапами воронки, retention/оттоком, временем
          прохождения сценария, использованием функций, количеством обращений
          в поддержку и бизнес-метриками checkout и бронирования
        </p>

        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex flex-wrap gap-0.5">
            <Pill :href="profile.telegramUrl" variant="accent" target="_blank" rel="noopener noreferrer">
              TG
            </Pill>
            <Pill :href="profile.linkedinUrl" target="_blank" rel="noopener noreferrer">LinkedIn</Pill>
            <Pill :href="`${baseUrl}cv.pdf`" download>↓ CV</Pill>
          </div>
          <Pill medium :aria-label="`Скопировать почту ${profile.email}`" @click="copyEmail">
            {{ copied ? 'Скопировано ✓' : profile.email }}
            <span v-if="!copied" aria-hidden="true">⧉</span>
          </Pill>
        </div>
      </div>

      <div class="rounded-[32px] bg-brand p-5 pb-[30px] text-white sm:p-6 sm:pb-[34px]">
        <h3 class="text-lg leading-snug font-semibold sm:text-xl sm:leading-7">
          5 ключевых результатов:
        </h3>
        <ul class="mt-4 flex flex-col gap-3 sm:mt-5 sm:gap-3">
          <li
            v-for="item in results"
            :key="item"
            class="relative pl-5 text-sm leading-snug font-medium sm:pl-6 sm:text-base sm:leading-6"
          >
            <span class="absolute left-0 text-accent" aria-hidden="true">—</span>
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
