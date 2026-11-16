<script setup lang="ts">
import { ref } from 'vue'
import Pill from '@/components/Pill.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import { profile } from '@/data/profile'
import { education, jobs, keyResults, skills } from '@/data/experience'

/**
 * «Обо мне»: чтобы понять человека, не открывая резюме.
 * Сверху — кто она и как работает, дальше — 5 ключевых результатов крупными цифрами,
 * потом опыт по компаниям: слева компания и период, справа проекты (обе колонки — от верхнего края) — задача и результаты
 * на виду, «что сделала» и образование — под шевронами.
 */
const baseUrl = import.meta.env.BASE_URL

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
      <!-- Кто она -->
      <div class="relative flex flex-col gap-8 rounded-[32px] glass p-6 text-white sm:gap-10 sm:p-10">
        <div class="flex flex-col gap-5">
          <p class="text-[22px] leading-[1.2] font-bold tracking-[-0.01em] sm:text-[28px] sm:leading-[34px]">
            Product Designer с 3+ годами опыта в мобильных приложениях и веб-продуктах: e-commerce,
            сервисы бронирования и digital health
          </p>
          <p class="max-w-[720px] text-base leading-snug font-medium opacity-80 sm:text-lg sm:leading-7">
            Веду продуктовые задачи end-to-end — от аналитики и интервью до A/B-теста и раскатки.
            Работаю с метриками: конверсия по шагам воронки, отток, время прохождения сценария,
            использование функций, обращения в поддержку, конверсия checkout и бронирования
          </p>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex flex-wrap gap-1">
            <Pill :href="profile.telegramUrl" variant="accent" target="_blank" rel="noopener noreferrer">
              Написать в Телеграм
            </Pill>
            <Pill :href="`${baseUrl}cv.pdf`" download>Моё резюме</Pill>
          </div>
          <Pill medium :aria-label="`Скопировать почту ${profile.email}`" @click="copyEmail">
            {{ copied ? 'Скопировано ✓' : profile.email }}
            <span v-if="!copied" aria-hidden="true">⧉</span>
          </Pill>
        </div>
      </div>

      <!-- 5 ключевых результатов -->
      <div class="relative rounded-[32px] glass p-3 text-white sm:p-4">
        <h3 class="px-3 pt-3 pb-4 text-lg leading-6 font-semibold sm:px-6 sm:pt-6 sm:text-xl">5 ключевых результатов</h3>
        <ul class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="r in keyResults" :key="r.metric + r.label" class="tile flex flex-col gap-3 rounded-[24px] p-5 sm:p-6">
            <span class="text-[40px] leading-none font-bold tracking-[-0.03em] text-accent sm:text-[48px]">{{ r.metric }}</span>
            <span class="text-base leading-5 font-semibold">{{ r.label }}</span>
            <span class="mt-auto text-[13px] leading-[18px] opacity-75">{{ r.how }}</span>
            <span class="text-xs leading-4 font-medium opacity-55">{{ r.where }}</span>
          </li>
          <!-- Шестая плитка — навыки -->
          <li class="tile flex flex-col gap-4 rounded-[24px] p-5 sm:p-6">
            <span class="text-base leading-5 font-semibold">Инструменты и методы</span>
            <ul class="flex flex-wrap gap-x-3 gap-y-1.5 text-[13px] leading-5 opacity-80">
              <li v-for="s in skills" :key="s" class="skill">{{ s }}</li>
            </ul>
          </li>
        </ul>
      </div>

      <!-- Опыт по компаниям: слева компания, справа проекты -->
      <article
        v-for="job in jobs"
        :key="job.company"
        class="relative grid grid-cols-1 gap-8 rounded-[32px] glass p-6 text-white sm:p-10 md:grid-cols-[240px_1fr] md:gap-12"
      >
        <header class="flex flex-col gap-4 md:self-start">
          <div>
            <p class="text-[13px] leading-4 opacity-60">{{ job.role }}</p>
            <h3 class="mt-2 text-[28px] leading-8 font-bold tracking-[-0.02em] sm:text-[32px] sm:leading-9">{{ job.company }}</h3>
          </div>
          <dl class="flex flex-col gap-1 text-sm leading-5">
            <dd class="font-semibold">{{ job.period }}</dd>
            <dd class="opacity-60">{{ job.duration }} · {{ job.place }}</dd>
          </dl>
        </header>

        <div class="flex flex-col">
          <section v-for="p in job.projects" :key="p.title" class="project">
            <div class="flex flex-col gap-1">
              <h4 class="text-[22px] leading-7 font-bold tracking-tight">{{ p.title }}</h4>
              <p class="text-[13px] leading-4 opacity-55">{{ p.about }}</p>
            </div>
            <p class="mt-3 text-[15px] leading-[22px] opacity-85">
              <span class="opacity-60">Задача:</span> {{ p.task }}
            </p>

            <!-- Результаты — всегда на виду -->
            <ul class="mt-5 flex flex-wrap gap-x-10 gap-y-4">
              <li v-for="r in p.results" :key="r.label" class="flex flex-col gap-1">
                <span class="text-[28px] leading-8 font-bold tracking-[-0.02em] text-accent">{{ r.metric }}</span>
                <span class="max-w-[160px] text-xs leading-4 opacity-70">{{ r.label }}</span>
              </li>
            </ul>

            <!-- Что сделала — под шевроном -->
            <details class="steps mt-4">
              <summary class="inline-flex cursor-pointer items-center gap-2 py-2 text-sm font-semibold">
                Что сделала
                <span class="chevron" aria-hidden="true" />
              </summary>
              <ol class="flex flex-col gap-2 pt-1 pb-1">
                <li v-for="(s, i) in p.steps" :key="i" class="flex gap-3 text-sm leading-5 opacity-90 sm:text-[15px] sm:leading-[22px]">
                  <span class="w-4 shrink-0 font-semibold text-accent tabular-nums">{{ i + 1 }}</span>
                  <span>{{ s }}</span>
                </li>
              </ol>
            </details>
          </section>
        </div>
      </article>

      <!-- Образование — под шевроном -->
      <details class="steps relative rounded-[32px] glass px-6 py-4 text-white sm:px-10 sm:py-5">
        <summary class="flex cursor-pointer items-center justify-between gap-4 py-2 text-lg font-semibold sm:text-xl">
          Образование и курсы
          <span class="chevron" aria-hidden="true" />
        </summary>
        <ul class="flex flex-col gap-3 pt-2 pb-3">
          <li v-for="e in education" :key="e.title" class="flex gap-5 text-sm leading-5 sm:text-base sm:leading-6">
            <span class="w-10 shrink-0 font-semibold text-accent tabular-nums">{{ e.year }}</span>
            <span><span class="font-semibold">{{ e.title }}</span> <span class="opacity-70">· {{ e.place }}</span></span>
          </li>
        </ul>
      </details>
    </div>
  </section>
</template>

<style scoped>
/* Плитка внутри стекла */
.tile {
  background: rgb(255 255 255 / 0.08);
}

/* Навыки — через точку-разделитель, без «кнопок» */
.skill:not(:last-child)::after {
  content: '·';
  margin-left: 12px;
  opacity: 0.5;
}

/* Проекты внутри компании разделены тонкой линией */
.project {
  padding-block: 24px;
  border-top: 1px solid rgb(255 255 255 / 0.14);
}
.project:first-child {
  padding-top: 0;
  border-top: 0;
}
.project:last-child {
  padding-bottom: 0;
}

/* Шевроны: плавное раскрытие (где браузер умеет анимировать высоту до auto) */
.steps {
  interpolate-size: allow-keywords;
}
.steps::details-content {
  block-size: 0;
  overflow: hidden;
  transition:
    block-size 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    content-visibility 0.4s allow-discrete;
}
.steps[open]::details-content {
  block-size: auto;
}
summary {
  list-style: none;
}
summary::-webkit-details-marker {
  display: none;
}
summary:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
.chevron {
  width: 9px;
  height: 9px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  rotate: 45deg;
  translate: 0 -2px;
  transition: rotate 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
details[open] > summary .chevron {
  rotate: 225deg;
  translate: 0 2px;
}
</style>
