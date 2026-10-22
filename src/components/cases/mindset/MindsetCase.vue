<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Pill from '@/components/Pill.vue'
import CaseSection from '@/components/cases/CaseSection.vue'
import MindsetPhone, { type MindsetScreen } from '@/components/cases/mindset/MindsetPhone.vue'
import './mock.css'

/** Кейс Mindset: от выбора психолога до первой консультации */

// Общие классы: подпись-рубрика, плитка внутри раздела, приглушённый текст
const kick = 'text-[11px] font-semibold tracking-[0.07em] uppercase'
const tile = 'flex min-w-0 flex-col gap-2.5 rounded-[20px] bg-surface p-5'
const muted = 'text-[15px] leading-normal text-ink/60'
const list = 'flex list-disc flex-col gap-1.5 pl-5 text-[15px] leading-normal'

const heroScreens: MindsetScreen[] = ['catalog', 'profile', 'booking', 'done']

const kpis = [
  { value: '18% → 27%', text: 'конверсия из регистрации в первую запись, +9 п.п.' },
  { value: '6 → 3 мин', text: 'от регистрации до записи, −50%' },
  { value: '−35%', text: 'обращений в поддержку по первой консультации' },
  { value: '~80', text: 'экранов и состояний интерфейса' },
]

const toc = [
  { id: 'discovery', label: 'Discovery' },
  { id: 'problem', label: 'Проблема' },
  { id: 'jtbd', label: 'JTBD' },
  { id: 'strategy', label: 'Стратегия' },
  { id: 'flow', label: 'Сценарии' },
  { id: 'solution', label: 'Решения' },
  { id: 'ds', label: 'Дизайн-система' },
  { id: 'team', label: 'Команда' },
  { id: 'results', label: 'Результаты' },
  { id: 'next', label: 'Выводы' },
]

const research = [
  {
    kicker: 'Конкурентный анализ',
    title: '«Ясно», «Грань», Zigmund.Online',
    points: [
      'Как находят специалиста под запрос',
      'Что видно в каталоге и в профиле',
      'Как устроены фильтры и сравнение',
      'Когда показывают цену и свободные слоты',
      'Сколько действий до записи',
    ],
  },
  {
    kicker: 'Интервью',
    title: '12–15 пользователей сервисов онлайн-психотерапии',
    points: [
      'Прошлый опыт и частота',
      'Критерии выбора специалиста',
      'Отношение к стоимости',
      'Важность квалификации',
      'Почему откладывают запись',
    ],
  },
]

const insights = [
  {
    title: 'Сложно выбирать среди многих',
    text: 'Когда различия неочевидны, пользователь сам собирает информацию из нескольких профилей и держит её в голове',
    solution: 'Фильтры по запросу, цене и времени',
  },
  {
    title: 'Доверие строится на квалификации',
    text: 'Фото и короткого описания мало. Важны специализация, опыт, образование, подход и отзывы',
    solution: 'Структурированный профиль специалиста',
  },
  {
    title: 'Цена и время решают ещё до записи',
    text: 'Если их видно только внутри профиля или позже, пользователь делает лишние действия и откладывает решение',
    solution: 'Цена и ближайшее время прямо в карточке каталога',
  },
]

const questions = [
  { title: 'Подходит ли мне этот специалист?', where: 'Каталог и фильтры' },
  { title: 'Могу ли я доверять его квалификации?', where: 'Профиль' },
  { title: 'Подходят ли цена и время?', where: 'Карточка и запись' },
]

const problemTiles = [
  {
    kicker: 'Проблема бизнеса',
    text: 'Первая запись — ключевое целевое действие. Сложный выбор и лишние шаги при бронировании теряли пользователей до первой консультации',
  },
  {
    kicker: 'Гипотеза',
    text: 'Если помочь быстрее находить подходящих психологов, показывать ключевые критерии раньше и упростить бронирование, больше людей завершат первую запись',
  },
  {
    kicker: 'Дизайн-задача',
    text: 'Сквозной сценарий: найти, сравнить, оценить квалификацию и условия, выбрать время, оплатить и подключиться. Баланс между полнотой информации и простотой',
  },
]

const principles = [
  {
    title: 'Снизить сложность поиска',
    text: 'Сузить выбор по специализации, стоимости и времени вместо просмотра всего каталога',
  },
  {
    title: 'Информация — к моменту решения',
    text: 'Цена и ближайшее время в каталоге, квалификация — в структурированном профиле',
  },
  {
    title: 'Запись последовательная',
    text: 'После выбора — время и оплата, без возврата к поиску условий',
  },
]

const flow = [
  'Онбординг',
  'Регистрация',
  'Каталог',
  'Профиль',
  'Дата и время',
  'Оплата',
  'Видеоконсультация',
  'Оценка',
]

const navTabs = [
  { title: 'Главная', text: 'вход в сценарии и ближайшая сессия' },
  { title: 'Каталог', text: 'поиск, фильтры, выбор психолога' },
  { title: 'Чат', text: 'общение со специалистом и ссылка на видео' },
  { title: 'Аккаунт', text: 'данные и записи' },
]

const solutions: {
  screen: MindsetScreen
  kicker: string
  title: string
  points: { title: string; text: string }[]
}[] = [
  {
    screen: 'filters',
    kicker: 'Решение 1 · Каталог',
    title: 'Сузить выбор вместо просмотра всех',
    points: [
      {
        title: 'Три фильтра, которые важны людям.',
        text: 'Запрос, стоимость и время — критерии из интервью, а не из базы данных',
      },
      {
        title: 'Число результатов на кнопке.',
        text: '«Показать 12 психологов» — видно, к чему приведёт фильтр',
      },
      {
        title: 'Упростили после теста.',
        text: 'Убрали лишние параметры, частые запросы вынесли чипсами над каталогом',
      },
    ],
  },
  {
    screen: 'filtered',
    kicker: 'Решение 2 · Карточка',
    title: 'Сравнить, не открывая профиль',
    points: [
      {
        title: 'Иерархия по интервью.',
        text: 'Имя, подход и опыт → специализации → ближайшее время и цена',
      },
      {
        title: 'Цена и время внизу карточки.',
        text: 'Одинаковое место в каждой карточке — глаз сравнивает по вертикали',
      },
      {
        title: 'Подробности — в профиль.',
        text: 'Меньше открываний карточек и возвратов в каталог',
      },
    ],
  },
  {
    screen: 'booking',
    kicker: 'Решение 3 · Запись',
    title: 'Линейный сценарий без возвратов',
    points: [
      {
        title: 'Профиль → Дата и время → Оплата → Подтверждение.',
        text: 'Ни одного шага назад к поиску условий',
      },
      {
        title: 'Психолог и цена всегда на виду.',
        text: 'Мини-карточка сверху подтверждает, к кому и за сколько записываешься',
      },
      {
        title: 'Что будет дальше — до оплаты.',
        text: 'Где пройдёт сессия и когда придёт ссылка. Отсюда меньше вопросов в поддержку',
      },
    ],
  },
  {
    screen: 'profile',
    kicker: 'Решение 4 · Профиль',
    title: 'Квалификация по смысловым блокам',
    points: [
      {
        title: 'Сначала главное.',
        text: 'Рейтинг, опыт и цена — тремя цифрами в шапке',
      },
      {
        title: 'Потом подробности.',
        text: 'Специализации, образование, подход, курсы и отзывы — отдельными блоками',
      },
      {
        title: 'Кнопка с ближайшим временем.',
        text: '«Записаться · сегодня в 19:00» снимает ещё один вопрос до записи',
      },
    ],
  },
]

const tokens = [
  { name: 'primary', text: 'CTA и активные состояния', color: 'var(--mm-pri)' },
  { name: 'surface/soft', text: 'чипсы и фон блоков', color: 'var(--mm-soft)' },
  { name: 'accent/slot', text: 'ближайшее время', color: 'var(--mm-slot)' },
  { name: 'success', text: 'запись и оплата', color: 'var(--mm-ok)' },
  { name: 'error', text: 'ошибки оплаты', color: 'var(--mm-err)' },
  { name: 'text/primary', text: 'основной текст', color: 'var(--mm-ink)' },
]

// Шаг, за который отвечала я, выделен цветом
const process = [
  { label: 'Гипотезы с PM', mine: false },
  { label: 'Приоритеты MVP', mine: false },
  { label: 'Макеты и состояния', mine: true },
  { label: 'Передача в разработку', mine: false },
  { label: 'Design QA', mine: false },
  { label: 'App Store и Google Play', mine: false },
  { label: '100% пользователей', mine: false },
]

const teamTiles = [
  {
    kicker: 'С Product Manager',
    text: 'Обсуждали гипотезы и требования, сопоставляли ценность решений со сроками и объёмом MVP',
  },
  {
    kicker: 'С разработкой',
    text: 'Компоненты в Figma с описанием поведения и состояний: загрузка, ошибки, подтверждение операций',
  },
  {
    kicker: 'Design QA',
    text: 'Проверяла типографику, цвета, отступы и состояния, проходила поиск, выбор времени и запись. Расхождения передавала на исправление',
  },
]

const metrics = [
  { title: 'Время до записи', value: '6 → 3 мин', text: 'от регистрации до записи, вдвое быстрее' },
  { title: 'Обращения в поддержку', value: '−35%', text: 'по вопросам первой консультации' },
]
</script>

<template>
  <!-- Шапка кейса: фиолетовая карточка шириной с шапку сайта -->
  <section class="mx-auto flex w-full max-w-page flex-col gap-8 rounded-[32px] bg-brand p-5 text-white sm:p-6">
    <Pill :to="{ name: 'home', hash: '#projects' }" medium class="self-start">
      ← Все проекты
    </Pill>

    <div class="flex max-w-[820px] flex-col gap-4">
      <span :class="kick" class="text-accent">Mindset · Mental HealthTech · B2C · iOS и Android</span>
      <h1 class="text-[32px] leading-[1.1] font-bold tracking-[-0.02em] sm:text-5xl">
        От выбора психолога до первой консультации
      </h1>
      <p class="max-w-[680px] text-base leading-snug font-medium text-white/85 sm:text-xl sm:leading-7">
        Мобильное приложение для онлайн-консультаций с психологами — с нуля и до публикации в сторах.
        Пользователи терялись среди специалистов и откладывали запись. Я перестроила каталог, карточку
        психолога и запись так, чтобы решение принималось в одном месте
      </p>
      <div class="mt-8 flex flex-wrap gap-0.5">
        <span
          v-for="chip in ['Product Designer — единственный дизайнер', 'Discovery · CJM · JTBD · UI · дизайн-система · Design QA', 'Команда: PM и разработчики']"
          :key="chip"
          class="rounded-full bg-white/15 px-4 py-2.5 text-[13px] font-medium sm:text-sm"
        >
          {{ chip }}
        </span>
      </div>
    </div>
  </section>

  <!--
    Экраны записи и ключевые цифры. Этот и следующие блоки шире колонки текста
    (до 1040px, как экраны концептов), чтобы телефоны не были мелкими
  -->
  <section
    class="mx-auto flex w-full max-w-[1040px] flex-col gap-8 rounded-[32px] bg-white p-5 text-ink sm:gap-10 sm:p-6"
    aria-label="Экраны и результаты"
  >
    <!-- На узком экране телефоны листаются вбок -->
    <div class="-mx-5 overflow-x-auto px-5 pb-2 sm:-mx-6 sm:px-6">
      <div class="grid grid-cols-[repeat(4,minmax(210px,1fr))] gap-4">
        <MindsetPhone v-for="screen in heroScreens" :key="screen" :screen="screen" />
      </div>
    </div>

    <dl class="grid grid-cols-2 gap-x-3 border-t border-ink/10 md:grid-cols-4">
      <div v-for="kpi in kpis" :key="kpi.value" class="flex flex-col gap-1 pt-4 pr-3">
        <dt class="order-2 text-[13px] leading-snug text-ink/60">{{ kpi.text }}</dt>
        <dd class="order-1 text-[22px] font-bold tracking-[-0.02em] text-brand tabular-nums sm:text-[28px]">
          {{ kpi.value }}
        </dd>
      </div>
    </dl>
  </section>

  <nav class="mx-auto flex w-full max-w-[1040px] flex-wrap gap-1 rounded-[32px] bg-white p-3 sm:p-4" aria-label="Разделы кейса">
    <RouterLink
      v-for="item in toc"
      :key="item.id"
      :to="{ hash: `#${item.id}` }"
      class="rounded-full bg-surface px-4 py-2.5 text-[13px] font-medium transition hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-sm"
    >
      {{ item.label }}
    </RouterLink>
  </nav>

  <CaseSection id="discovery" num="01" kicker="Discovery" title="Как люди выбирают психолога">
    <p :class="muted" class="max-w-[68ch] sm:text-base">
      Продукт для молодых специалистов, которым нужна психологическая поддержка онлайн. Ключевой сценарий —
      от регистрации до первой консультации: выбрать психолога, оценить квалификацию, найти время, оплатить
      и подключиться к видеосессии
    </p>

    <div class="grid gap-2 sm:grid-cols-2">
      <div v-for="item in research" :key="item.kicker" :class="tile">
        <span :class="kick" class="text-ink/50">{{ item.kicker }}</span>
        <p class="text-base font-semibold">{{ item.title }}</p>
        <ul :class="list" class="text-ink/70">
          <li v-for="point in item.points" :key="point">{{ point }}</li>
        </ul>
      </div>
    </div>

    <h3 class="text-xl font-semibold">Ключевые инсайты</h3>
    <ol class="flex flex-col gap-2">
      <li
        v-for="(item, i) in insights"
        :key="item.title"
        class="grid grid-cols-[32px_1fr] gap-x-4 gap-y-3 rounded-[20px] bg-surface p-5 md:grid-cols-[40px_1fr_220px] md:gap-5"
      >
        <span class="text-[28px] leading-none font-bold text-brand">{{ i + 1 }}</span>
        <div class="flex min-w-0 flex-col gap-2">
          <h4 class="text-lg leading-snug font-semibold">{{ item.title }}</h4>
          <p :class="muted">{{ item.text }}</p>
        </div>
        <div class="col-start-2 flex flex-col gap-1.5 rounded-2xl bg-white p-4 md:col-start-3">
          <span :class="kick" class="text-brand">→ Решение</span>
          <p class="text-[15px] font-semibold">{{ item.solution }}</p>
        </div>
      </li>
    </ol>

    <h3 class="text-xl font-semibold">Три вопроса, на которые должен ответить интерфейс</h3>
    <div class="grid gap-2 sm:grid-cols-3">
      <div v-for="item in questions" :key="item.title" :class="tile">
        <span class="grid size-8 place-items-center rounded-full bg-accent font-bold" aria-hidden="true">?</span>
        <b class="text-lg leading-snug font-semibold">{{ item.title }}</b>
        <span class="text-[13px] text-ink/60">{{ item.where }}</span>
      </div>
    </div>
  </CaseSection>

  <CaseSection id="problem" num="02" kicker="Продуктовая проблема" title="Сложно не найти психолога, а принять решение">
    <figure class="flex flex-col gap-2.5 rounded-[20px] border-2 border-brand p-5 sm:px-7 sm:py-6">
      <figcaption :class="kick" class="text-brand">Проблема пользователя</figcaption>
      <blockquote class="text-lg leading-snug font-medium sm:text-[22px]">
        «Я хочу обратиться за помощью, но не понимаю, какой специалист мне подходит, чем психологи отличаются
        и кому можно доверять»
      </blockquote>
    </figure>
    <div class="grid gap-2 md:grid-cols-3">
      <div v-for="item in problemTiles" :key="item.kicker" :class="tile">
        <span :class="kick" class="text-ink/50">{{ item.kicker }}</span>
        <p class="text-[15px] leading-normal">{{ item.text }}</p>
      </div>
    </div>
  </CaseSection>

  <CaseSection id="jtbd" num="03" kicker="JTBD" title="Какую задачу решает пользователь">
    <div class="grid gap-2 md:grid-cols-2">
      <div class="flex flex-col gap-2.5 rounded-[20px] bg-brand p-5 text-white sm:p-6">
        <span :class="kick" class="text-white/70">Основной JTBD</span>
        <p class="text-base leading-snug font-medium sm:text-lg">
          Когда я сталкиваюсь с психологическими трудностями и решаю обратиться за помощью, я хочу быстро
          найти специалиста, которому смогу доверять, чтобы получить поддержку без долгого и сложного поиска
        </p>
      </div>
      <div class="flex flex-col gap-2.5 rounded-[20px] bg-surface p-5 sm:p-6">
        <span :class="kick" class="text-ink/50">Вторичный JTBD</span>
        <p class="text-base leading-snug font-medium sm:text-lg">
          Когда я выбрала психолога, я хочу видеть время, стоимость и понятные шаги записи, чтобы
          забронировать консультацию самой и быть уверенной, что всё оформлено правильно
        </p>
      </div>
    </div>
    <div class="grid gap-2 sm:grid-cols-2">
      <div :class="tile">
        <span :class="kick" class="text-ink/50">Функциональная задача</span>
        <p class="text-[15px] leading-normal">
          Найти психолога с подходящей специализацией, квалификацией, стоимостью и временем
        </p>
      </div>
      <div :class="tile">
        <span :class="kick" class="text-ink/50">Эмоциональная задача</span>
        <p class="text-[15px] leading-normal">
          Почувствовать уверенность в выборе и снизить тревогу перед первой консультацией
        </p>
      </div>
    </div>
    <p class="text-[13px] text-ink/60">
      UX-критерий успеха: дойти от регистрации до первой записи без посторонней помощи и возвратов между экранами
    </p>
  </CaseSection>

  <CaseSection id="strategy" num="04" kicker="Стратегия" title="Сократить сложность выбора, а не усложнить подбор">
    <h3 class="text-xl font-semibold">Выбор подхода для MVP</h3>
    <div class="grid gap-2 sm:grid-cols-2">
      <div :class="tile">
        <span :class="kick" class="text-ink/50">Рассматривали</span>
        <b class="text-lg font-semibold">Персональный подбор через анкету</b>
        <ul :class="list">
          <li>Помогает тем, кто не знает, кого выбрать</li>
          <li>Нужна логика подбора и рекомендаций</li>
          <li>Больше объём разработки, не укладывается в сроки</li>
        </ul>
      </div>
      <div :class="tile" class="bg-brand! text-white">
        <span :class="kick" class="text-white/70">Выбрали</span>
        <b class="text-lg font-semibold">Каталог с фильтрами и информативными профилями</b>
        <ul :class="list">
          <li>Решает найденные проблемы</li>
          <li>Пользователь сам управляет выбором</li>
          <li>Укладывается в MVP, подбор остаётся на будущее</li>
        </ul>
      </div>
    </div>

    <h3 class="text-xl font-semibold">Три принципа</h3>
    <div class="grid gap-2 md:grid-cols-3">
      <div v-for="(item, i) in principles" :key="item.title" :class="tile">
        <span class="text-[30px] leading-none font-bold text-brand">{{ i + 1 }}</span>
        <b class="text-base font-semibold">{{ item.title }}</b>
        <span class="text-sm leading-normal text-ink/60">{{ item.text }}</span>
      </div>
    </div>
  </CaseSection>

  <CaseSection id="flow" num="05" kicker="Проектирование сценариев" title="От потребности до консультации">
    <div class="-mx-5 overflow-x-auto px-5 pb-4 sm:-mx-6 sm:px-6">
      <ol class="flex min-w-max items-center gap-1.5">
        <template v-for="(step, i) in flow" :key="step">
          <li class="rounded-xl bg-surface px-3 py-2 text-[13px]">{{ step }}</li>
          <li v-if="i < flow.length - 1" class="text-ink/40" aria-hidden="true">→</li>
        </template>
      </ol>
    </div>
    <div class="grid grid-cols-2 gap-2 md:grid-cols-4">
      <div v-for="tab in navTabs" :key="tab.title" class="flex flex-col gap-1 rounded-2xl bg-surface p-4">
        <b class="text-[15px]">{{ tab.title }}</b>
        <span class="text-[13px] leading-snug text-ink/60">{{ tab.text }}</span>
      </div>
    </div>
    <div class="grid gap-2 sm:grid-cols-2">
      <div :class="tile">
        <strong class="text-[44px] leading-none font-bold tracking-[-0.02em]">~80</strong>
        <p class="text-[15px] leading-normal">
          экранов и состояний в Figma: регистрация и анкета, поиск, запись, оплата, чат, видеосессия, оценка
        </p>
      </div>
      <div :class="tile">
        <span :class="kick" class="text-ink/50">UX-тестирование прототипа</span>
        <p class="text-[15px] leading-normal">
          Задача: пройти сценарий от выбора психолога до записи. Две главные сложности:
        </p>
        <ul :class="list">
          <li>Терялись среди большого количества специалистов</li>
          <li>Не понимали, чем психологи отличаются друг от друга</li>
        </ul>
        <p class="text-[15px] leading-normal font-semibold">
          Вывод: нужно не больше информации, а понятный способ находить, сравнивать и использовать её
        </p>
      </div>
    </div>
  </CaseSection>

  <CaseSection id="solution" num="06" kicker="UX/UI-решения" title="Четыре изменения ключевого сценария">
    <div class="flex flex-col gap-10 sm:gap-12">
      <div
        v-for="(item, i) in solutions"
        :key="item.screen"
        class="grid items-center gap-6 md:gap-12"
        :class="i % 2 ? 'md:grid-cols-[1fr_240px]' : 'md:grid-cols-[240px_1fr]'"
      >
        <MindsetPhone :screen="item.screen" class="w-full max-w-[240px] justify-self-center" :class="{ 'md:order-2': i % 2 }" />
        <div class="flex min-w-0 flex-col gap-4">
          <span :class="kick" class="text-brand">{{ item.kicker }}</span>
          <h3 class="text-[22px] leading-tight font-semibold tracking-[-0.01em] sm:text-[26px]">{{ item.title }}</h3>
          <ul class="flex flex-col gap-3.5">
            <li
              v-for="point in item.points"
              :key="point.title"
              class="border-l-2 border-brand/30 pl-4 text-[15px] leading-normal text-ink/60"
            >
              <b class="mb-0.5 block font-semibold text-ink">{{ point.title }}</b>
              {{ point.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </CaseSection>

  <CaseSection id="ds" num="07" kicker="Дизайн-система" title="Спокойный визуальный язык и библиотека компонентов">
    <p :class="muted" class="max-w-[68ch] sm:text-base">
      Приложение делалось с нуля, поэтому сначала — единые правила. Спокойная палитра, понятная типографика
      и выраженная иерархия помогают сосредоточиться на выборе, а акцентные CTA ведут к следующему шагу
    </p>
    <div class="mm grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
      <div v-for="token in tokens" :key="token.name" class="flex flex-col gap-1 rounded-2xl bg-surface p-3">
        <i class="mb-1 block h-10 rounded-lg ring-1 ring-ink/5 ring-inset" :style="{ background: token.color }"></i>
        <b class="text-[12px] font-semibold">{{ token.name }}</b>
        <span class="text-[12px] leading-snug text-ink/60">{{ token.text }}</span>
      </div>
    </div>
    <div class="mm grid gap-2 md:grid-cols-3">
      <div :class="tile" class="text-[12.5px]">
        <span :class="kick" class="text-ink/50">Карточка психолога</span>
        <div class="mm-card">
          <div class="mm-row">
            <span class="mm-ava b"></span>
            <div><b>Илья Соколов</b><span>Гештальт · 5 лет</span></div>
            <span class="mm-rate">4,8</span>
          </div>
          <div class="mm-foot"><span class="mm-slot">Завтра в 10:00</span><b>2 500 ₽</b></div>
        </div>
      </div>
      <div :class="tile" class="text-[12.5px]">
        <span :class="kick" class="text-ink/50">Слоты времени</span>
        <div class="mm-slots"><span>17:00</span><span class="on">19:00</span><span class="off">21:00</span></div>
        <span :class="kick" class="mt-1 text-ink/50">Кнопки</span>
        <div class="mm-btn">Записаться</div>
        <div class="mm-btn ghost">Написать в чат</div>
      </div>
      <div :class="tile">
        <span :class="kick" class="text-ink/50">Состояния</span>
        <div class="mm-states">
          <span class="load">Загружаем расписание…</span>
          <span class="err">Оплата не прошла. Деньги не списаны</span>
          <span class="ok">Вы записаны на 22 октября, 19:00</span>
        </div>
      </div>
    </div>
    <p class="text-[13px] text-ink/60">
      Состояния загрузки, ошибок и успеха особенно важны в записи и оплате: пользователь должен понимать,
      завершилось ли действие и что будет дальше
    </p>
  </CaseSection>

  <CaseSection id="team" num="08" kicker="Команда и запуск" title="От гипотез до 100% пользователей">
    <div class="-mx-5 overflow-x-auto px-5 pb-4 sm:-mx-6 sm:px-6">
      <ol class="flex min-w-max items-center gap-1.5">
        <template v-for="(step, i) in process" :key="step.label">
          <li
            class="rounded-xl px-3 py-2 text-[13px]"
            :class="step.mine ? 'bg-brand font-semibold text-white' : 'bg-surface'"
          >
            {{ step.label }}
          </li>
          <li v-if="i < process.length - 1" class="text-ink/40" aria-hidden="true">→</li>
        </template>
      </ol>
    </div>
    <div class="grid gap-2 md:grid-cols-3">
      <div v-for="item in teamTiles" :key="item.kicker" :class="tile">
        <span :class="kick" class="text-ink/50">{{ item.kicker }}</span>
        <p class="text-[15px] leading-normal">{{ item.text }}</p>
      </div>
    </div>
  </CaseSection>

  <CaseSection id="results" num="09" kicker="Результаты" title="Влияние на продукт">
    <div class="grid gap-2 md:grid-cols-[1.3fr_1fr_1fr]">
      <div class="flex flex-col justify-end gap-1.5 rounded-[20px] bg-brand p-5 text-white sm:p-6">
        <span :class="kick" class="text-white/70">Ключевая метрика</span>
        <b class="text-[15px] font-semibold">Конверсия в первую запись</b>
        <strong class="text-[40px] leading-[1.1] font-bold tracking-[-0.02em] whitespace-nowrap text-accent tabular-nums sm:text-[44px]">
          18% → 27%
        </strong>
        <span class="text-[13px] text-white/75">+9 п.п., или +50% к исходному значению</span>
      </div>
      <div v-for="item in metrics" :key="item.title" :class="tile" class="gap-1.5!">
        <b class="text-[15px] font-semibold">{{ item.title }}</b>
        <strong class="text-[34px] leading-[1.1] font-bold tracking-[-0.02em] tabular-nums">{{ item.value }}</strong>
        <span class="text-[13px] text-ink/60">{{ item.text }}</span>
      </div>
    </div>
    <div class="grid gap-2 sm:grid-cols-2">
      <div :class="tile">
        <span :class="kick" class="text-ink/50">Для пользователей</span>
        <ul :class="list">
          <li>Быстрее находят релевантных психологов</li>
          <li>Цена, время и квалификация — там, где принимается решение</li>
          <li>Меньше действий до записи</li>
        </ul>
      </div>
      <div :class="tile" class="bg-brand! text-white">
        <span :class="kick" class="text-white/70">Для продукта</span>
        <ul :class="list">
          <li>Полный сценарий от регистрации до видеоконсультации</li>
          <li>Рост конверсии и скорости записи</li>
          <li>Меньше нагрузки на поддержку</li>
        </ul>
      </div>
    </div>
  </CaseSection>

  <CaseSection id="next" num="10" kicker="Дальше и выводы" title="Следующий фокус — повторная запись">
    <p :class="muted" class="max-w-[68ch] sm:text-base">
      После первой консультации важно продолжение терапии: записаться к знакомому психологу на следующую
      встречу, не проходя поиск заново
    </p>
    <div class="flex flex-col gap-2.5 rounded-[20px] bg-brand p-5 text-white sm:p-7">
      <span :class="kick" class="text-white/70">Главный вывод</span>
      <p class="max-w-[46ch] text-lg leading-snug font-medium sm:text-[24px]">
        Эффективность сценария зависит не от количества информации, а от того, как она структурирована
        и показана в момент принятия решения
      </p>
    </div>
    <p class="flex flex-wrap justify-between gap-2 border-t border-ink/10 pt-4 text-[13px] text-ink/50">
      <span>Product Designer · Mental HealthTech</span>
      <span>Имена и данные специалистов на экранах вымышлены</span>
    </p>
  </CaseSection>
</template>
