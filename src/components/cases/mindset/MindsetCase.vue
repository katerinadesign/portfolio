<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Pill from '@/components/Pill.vue'
import MindsetPhone, { type MindsetScreen } from '@/components/cases/mindset/MindsetPhone.vue'
import './board.css'

/**
 * Кейс Mindset: от выбора психолога до первой консультации.
 * Длинная доска из разделов; заглушки [в скобках] нужно заменить реальными данными
 */

const nav = [
  { id: 'overview', label: 'о проекте' },
  { id: 'discovery', label: 'discovery' },
  { id: 'jtbd', label: 'JTBD' },
  { id: 'strategy', label: 'стратегия' },
  { id: 'flow', label: 'сценарии' },
  { id: 'solution', label: 'решения' },
  { id: 'ds', label: 'дизайн-система' },
  { id: 'results', label: 'результаты' },
]

const competitors = ['«Ясно»', '«Грань»', 'Zigmund.Online']

const insights = [
  {
    title: 'Психологи выглядят одинаково',
    text: 'Человек открывает несколько профилей и сравнивает их в голове. Выбор утомляет, запись откладывается',
    to: 'Фильтры по запросу, цене и времени',
  },
  {
    title: 'Доверие строится на квалификации',
    text: 'Фото и короткого описания мало. Важны специализация, опыт, образование, подход и отзывы',
    to: 'Профиль из смысловых блоков',
  },
  {
    title: 'Цена и время отсеивают раньше всего',
    text: 'Если их видно только в профиле, человек делает лишние действия и откладывает решение',
    to: 'Цена и ближайшее время в карточке',
  },
]

const questions = [
  { q: 'Подходит ли мне этот специалист?', where: 'Каталог и фильтры' },
  { q: 'Могу ли я доверять его квалификации?', where: 'Профиль' },
  { q: 'Подходят ли цена и время?', where: 'Карточка и запись' },
]

const jobs = [
  {
    kicker: 'Вторичный JTBD',
    text: 'Когда я выбрала психолога, я хочу видеть время, стоимость и понятные шаги записи, чтобы записаться самой',
  },
  {
    kicker: 'Функциональная задача',
    text: 'Найти психолога с подходящей специализацией, квалификацией, стоимостью и временем',
  },
  {
    kicker: 'Эмоциональная задача',
    text: 'Почувствовать уверенность в выборе и снизить тревогу перед первой консультацией',
  },
]

const options = [
  {
    status: 'Рассматривали',
    title: 'Персональный подбор через анкету',
    plus: ['Помогает тем, кто не знает, кого выбрать'],
    minus: ['Нужна логика подбора и рекомендаций', 'Не укладывается в сроки'],
    why: 'Оставили на следующие версии',
    pick: false,
  },
  {
    status: 'Выбрали',
    title: 'Каталог с фильтрами и информативными профилями',
    plus: ['Закрывает все три инсайта', 'Пользователь сам управляет выбором', 'Укладывается в MVP'],
    minus: [],
    why: 'Подбор можно добавить поверх каталога позже',
    pick: true,
  },
]

const principles = [
  { title: 'Сузить выбор', text: 'Фильтры по запросу, стоимости и времени вместо всего каталога' },
  { title: 'Информация — к моменту решения', text: 'Цена и время — в каталоге, квалификация — в профиле' },
  { title: 'Запись без возвратов', text: 'После выбора — только время и оплата' },
]

// Шаги сценария; key — те, что перестраивали
const flow = [
  { step: 'Онбординг' },
  { step: 'Регистрация' },
  { step: 'Каталог', key: true },
  { step: 'Профиль', key: true },
  { step: 'Дата и время', key: true },
  { step: 'Оплата', key: true },
  { step: 'Видеосессия' },
  { step: 'Оценка' },
]

const navTabs = [
  { title: 'Главная', text: 'вход в сценарии и ближайшая сессия' },
  { title: 'Каталог', text: 'поиск, фильтры, выбор психолога' },
  { title: 'Чат', text: 'общение и ссылка на видео' },
  { title: 'Аккаунт', text: 'данные и записи' },
]

const solutions: { screen: MindsetScreen; label: string; title: string; points: { b: string; t?: string }[] }[] = [
  {
    screen: 'filters',
    label: '01 · Каталог',
    title: 'Сузить выбор вместо просмотра всех',
    points: [
      { b: 'Три фильтра, важные людям:', t: 'запрос, стоимость, время' },
      { b: 'Число результатов на кнопке', t: '— видно, к чему приведёт фильтр' },
      { b: 'Упростили после теста:', t: 'частые запросы — чипсами' },
    ],
  },
  {
    screen: 'catalog',
    label: '02 · Карточка',
    title: 'Сравнить, не открывая профиль',
    points: [
      { b: 'Иерархия по интервью:', t: 'имя, подход и опыт → специализации → время и цена' },
      { b: 'Цена и время в одном месте', t: 'каждой карточки' },
      { b: 'Подробности — в профиль' },
    ],
  },
  {
    screen: 'profile',
    label: '03 · Профиль',
    title: 'Квалификация смысловыми блоками',
    points: [
      { b: 'Сначала главное:', t: 'рейтинг, опыт и цена в шапке' },
      { b: 'Потом подробности:', t: 'специализации, образование, отзывы' },
      { b: 'Кнопка с ближайшим временем' },
    ],
  },
  {
    screen: 'booking',
    label: '04 · Запись',
    title: 'Линейный сценарий без возвратов',
    points: [
      { b: 'Профиль → время → оплата → готово' },
      { b: 'Психолог и цена всегда на виду', t: 'в мини-карточке' },
      { b: 'Что будет дальше — до оплаты' },
    ],
  },
]

const palette = [
  { color: 'var(--color-brand)', name: 'primary', text: 'кнопки и акценты' },
  { color: 'var(--mb-soft)', name: 'surface/soft', text: 'чипсы, фон блоков' },
  { color: 'var(--mb-g1)', name: 'gradient/trust', text: 'психолог, доверие' },
  { color: 'var(--mb-g2)', name: 'gradient/choice', text: 'выбор и фильтры' },
  { color: 'var(--mb-g5)', name: 'gradient/success', text: 'время и запись' },
  { color: 'var(--mb-g4)', name: 'gradient/alert', text: 'ошибки и срочное' },
]

const voice = [
  { was: 'Ошибка платежа', now: 'Оплата не прошла. Деньги не списаны' },
  { was: 'Слотов нет', now: 'Ближайшее время — завтра в 10:00' },
  { was: 'Бронирование подтверждено', now: 'Вы записаны. Ссылка придёт в чат' },
]

const pipeline = [
  'Гипотезы с PM',
  'Приоритеты MVP',
  'Макеты и состояния',
  'Передача в разработку',
  'Design QA',
  'App Store и Google Play',
  '100% пользователей',
]

const team = [
  {
    title: 'С Product Manager',
    text: 'Обсуждали гипотезы и требования, сопоставляли ценность решений со сроками и объёмом MVP',
  },
  {
    title: 'С разработкой',
    text: 'Компоненты в Figma с описанием поведения и состояний: загрузка, ошибки, подтверждение',
  },
  {
    title: 'Design QA',
    text: 'Проверяла типографику, цвета, отступы и состояния, проходила поиск, выбор времени и запись',
  },
]

const metrics = [
  { label: 'Конверсия в первую запись', value: '18% → 27%', note: '+9 п.п., или +50%', key: true },
  { label: 'Время до записи', value: '6 → 3 мин', note: 'вдвое быстрее' },
  { label: 'Обращения в поддержку', value: '−35%', note: 'по первой консультации' },
]

const links = [
  { title: 'Конверсия', text: 'Фильтры и карточка с ценой и временем' },
  { title: 'Время', text: 'Линейная запись без возвратов' },
  { title: 'Поддержка', text: '«Что будет дальше» до оплаты и понятные ошибки' },
]
</script>

<template>
  <div class="mb">
    <!-- Обложка: заголовок, большой телефон с каталогом, ключевые факты -->
    <section class="mb-cover">
      <div class="mb-cv-left">
        <div class="flex flex-col items-start gap-5">
          <Pill :to="{ name: 'home', hash: '#projects' }" variant="light" medium class="bg-surface!">
            ← Все проекты
          </Pill>
          <div class="mb-cv-brand">Mindset Case Study</div>
        </div>
        <h1 class="mb-cv-h">От выбора психолога <span>до первой консультации за 3 минуты</span></h1>
        <div class="mb-cv-foot">Mental <b>HealthTech</b></div>
      </div>

      <div class="mb-cv-phone mb-bigph" role="img" aria-label="Каталог психологов в приложении Mindset">
        <div class="sb"><span>9:41</span><span>●●● ▮</span></div>
        <h4>Психологи</h4>
        <div class="mb-grid4">
          <div class="mb-gt t1">
            Анна Лебедева<small>КПТ · 7 лет</small>
            <div class="big">4,9</div>
            <div class="ticks"></div>
            <div class="ft"><span>Сегодня 19:00</span></div>
          </div>
          <div class="mb-gt t2">
            Стоимость<small>до 3 000 ₽</small>
            <div class="big">2800<sup>₽</sup></div>
            <div class="ticks"></div>
            <div class="ft"><span>50 минут</span><span>сессия</span></div>
          </div>
          <div class="mb-gt t3">
            Опыт<small>практики</small>
            <div class="ring">7</div>
            <div class="ft"><span>лет</span></div>
          </div>
          <div class="mb-gt t4">
            Ближайшее<small>время</small>
            <div class="orb"></div>
            <div class="ticks"></div>
            <div class="ft"><span>19:00</span></div>
          </div>
        </div>
        <div class="ctrl"><i>✕</i><span>Фильтры</span><i class="w">✓</i></div>
        <div class="pg"><i></i><i></i></div>
      </div>

      <div class="mb-cv-right">
        <div class="mb-cv-pair">
          <b>Роль</b><span class="mb-cv-m">Product Designer, единственный дизайнер в команде</span>
        </div>
        <b>iOS и Android<br />с нуля до сторов</b>
        <div class="mb-mark" aria-hidden="true">
          <i class="p1"></i><i class="c"></i><i class="c"></i><i class="p2"></i>
        </div>
        <div class="flex flex-col gap-1">
          <span class="mb-cv-m whitespace-nowrap">{18% → 27%}</span>
          <b>Конверсия в первую запись</b>
        </div>
        <div class="mb-cv-pair">
          <b>Процесс</b><span class="mb-cv-m">Discovery, CJM, JTBD, UX/UI, дизайн-система, Design QA</span>
        </div>
      </div>
    </section>

    <!-- О проекте (id не «about» — так называется раздел главной в шапке) -->
    <section id="overview" class="mb-board violet mb-about">
      <nav class="mb-navpills" aria-label="Разделы кейса">
        <RouterLink v-for="(item, i) in nav" :key="item.id" :to="{ hash: '#' + item.id }" :class="{ on: i === 0 }">
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="mb-ab-l">
        <p class="mb-ab-lead">
          Mindset — приложение для онлайн-консультаций с психологами. Я спроектировала его с нуля и довела до
          публикации в сторах
        </p>
        <p>
          После первого релиза стало видно: люди теряются среди специалистов и откладывают запись. Я перестроила
          каталог, карточку, профиль и запись так, чтобы решение принималось в одном месте
        </p>
        <div class="mb-ab-meta">
          <div><span>Роль</span>Product Designer, единственный дизайнер</div>
          <div><span>Команда</span>Product Manager и разработчики</div>
          <div><span>Что делала</span>Discovery · CJM · JTBD · UX/UI · дизайн-система · Design QA</div>
        </div>
      </div>
      <div class="mb-fan">
        <MindsetPhone screen="filters" class="f1" />
        <MindsetPhone screen="profile" class="f2" />
        <MindsetPhone screen="done" class="f3" />
      </div>
    </section>

    <!-- 01 Discovery -->
    <section id="discovery" class="mb-board">
      <div class="mb-bh">
        <div class="mb-bl"><span class="mb-bno">{01}</span><span class="mb-bey">Discovery</span></div>
        <h2>Почему люди откладывают <span>запись к психологу</span></h2>
        <p>
          Аудитория — молодые специалисты, которым нужна психологическая поддержка онлайн. Ключевой сценарий: от
          регистрации до первой консультации
        </p>
      </div>
      <div class="mb-g2">
        <div class="mb-tile">
          <span class="mb-kick">Конкурентный анализ</span>
          <b class="mb-tt">«Ясно», «Грань», Zigmund.Online</b>
          <ul class="mb-dots">
            <li>Как подбирают специалиста под запрос</li>
            <li>Что видно в каталоге, а что — только в профиле</li>
            <li>Когда показывают цену и свободные слоты</li>
            <li>Сколько действий до записи</li>
          </ul>
        </div>
        <div class="mb-tile">
          <span class="mb-kick">Глубинные интервью</span>
          <b class="mb-tt"><mark class="mb-fill">[N]</mark> пользователей сервисов онлайн-психотерапии</b>
          <ul class="mb-dots">
            <li>Прошлый опыт и частота встреч</li>
            <li>По каким критериям выбирают специалиста</li>
            <li>Отношение к стоимости и квалификации</li>
            <li>Что заставляет отложить запись</li>
          </ul>
          <p class="mb-small">Кто они: <mark class="mb-fill">[возраст, опыт терапии]</mark></p>
        </div>
      </div>
      <div class="mb-g3 mb-mt">
        <div v-for="name in competitors" :key="name" class="mb-tile mb-todo">
          <span class="mb-kick">{{ name }}</span>
          <p><b>Сильная сторона:</b> <mark class="mb-fill">[что работает]</mark></p>
          <p><b>Мешает записаться:</b> <mark class="mb-fill">[слабое место]</mark></p>
        </div>
      </div>

      <h3 class="mb-sub">Ключевые инсайты</h3>
      <div class="mb-g3">
        <div v-for="(item, i) in insights" :key="item.title" class="mb-ins">
          <span class="n mb-num">{{ i + 1 }}</span>
          <b>{{ item.title }}</b>
          <p>{{ item.text }}</p>
          <div class="to">→ {{ item.to }}</div>
        </div>
      </div>

      <h3 class="mb-sub">Три вопроса, на которые должен ответить интерфейс</h3>
      <div class="mb-g3">
        <div v-for="item in questions" :key="item.q" class="mb-q">
          <i class="mb-num">?</i>
          <b>{{ item.q }}</b>
          <span>{{ item.where }}</span>
        </div>
      </div>
    </section>

    <!-- 02 Продуктовая проблема -->
    <section id="problem" class="mb-board sky">
      <div class="mb-bh">
        <div class="mb-bl"><span class="mb-bno">{02}</span><span class="mb-bey">Продуктовая проблема</span></div>
        <h2>Сложно не найти психолога, <span>а решиться на запись</span></h2>
      </div>
      <div class="mb-pb">
        <div class="mb-quote">
          <span class="mb-kick">Проблема пользователя</span>
          «Я хочу обратиться за помощью, но не понимаю, какой специалист мне подходит, чем психологи отличаются и
          кому можно доверять»
        </div>
        <div class="mb-biz">
          <span class="mb-kick">Проблема бизнеса</span>
          <b class="mb-huge mb-num">18%</b>
          <p>
            зарегистрировавшихся доходили до первой записи — главного целевого действия. Сложный выбор терял людей
            ещё до консультации
          </p>
        </div>
      </div>
      <div class="mb-hyp">
        <span class="mb-kick">Гипотеза</span>
        <p>
          <em>Если</em> помочь быстрее находить подходящих психологов, показывать ключевые критерии раньше и
          упростить запись, <em>то</em> больше людей дойдут до первой консультации, <em>потому что</em> решение
          будет приниматься в одном месте
        </p>
      </div>
      <div class="mb-task">
        <span class="mb-kick">Дизайн-задача</span>
        <p>
          Сквозной сценарий: найти, сравнить, оценить квалификацию и условия, выбрать время, оплатить и
          подключиться. Баланс — между полнотой информации и простотой
        </p>
      </div>
    </section>

    <!-- 03 JTBD -->
    <section id="jtbd" class="mb-board">
      <div class="mb-bh">
        <div class="mb-bl"><span class="mb-bno">{03}</span><span class="mb-bey">JTBD</span></div>
        <h2>Какую задачу <span>решает пользователь</span></h2>
      </div>
      <p class="mb-jmain mb-ind">
        Когда я решаю обратиться за помощью, я хочу <span class="hl">быстро найти</span> специалиста, которому
        смогу доверять, чтобы получить поддержку без долгого поиска
      </p>
      <div class="mb-g3 mt-10">
        <div v-for="job in jobs" :key="job.kicker" class="mb-tile">
          <span class="mb-kick">{{ job.kicker }}</span>
          <p class="mb-lg">{{ job.text }}</p>
        </div>
      </div>
      <div class="mb-crit">
        <b>Критерий успеха</b>
        Дойти от регистрации до первой записи без посторонней помощи и возвратов между экранами
      </div>
    </section>

    <!-- 04 Стратегия -->
    <section id="strategy" class="mb-board dark">
      <div class="mb-bh">
        <div class="mb-bl"><span class="mb-bno">{04}</span><span class="mb-bey">Стратегия</span></div>
        <h2>Упростить выбор, <span>а не усложнить подбор</span></h2>
        <p>Для MVP сравнили два подхода: что закрывает найденные проблемы в сроки и объём первой версии</p>
      </div>
      <div class="mb-g2">
        <div v-for="opt in options" :key="opt.title" class="mb-opt" :class="{ pick: opt.pick }">
          <span class="st">{{ opt.status }}</span>
          <b>{{ opt.title }}</b>
          <ul>
            <li v-for="item in opt.plus" :key="item" class="p">{{ item }}</li>
            <li v-for="item in opt.minus" :key="item" class="m">{{ item }}</li>
          </ul>
          <span class="why">{{ opt.why }}</span>
        </div>
      </div>
      <div class="mb-g3 mb-lines">
        <div v-for="(item, i) in principles" :key="item.title">
          <i>0{{ i + 1 }}</i>
          <b>{{ item.title }}</b>
          <p>{{ item.text }}</p>
        </div>
      </div>
    </section>

    <!-- 05 Сценарии -->
    <section id="flow" class="mb-board">
      <div class="mb-bh">
        <div class="mb-bl"><span class="mb-bno">{05}</span><span class="mb-bey">Проектирование сценариев</span></div>
        <h2>От потребности <span>до консультации</span></h2>
      </div>
      <div class="mb-flow mb-ind">
        <template v-for="(item, i) in flow" :key="item.step">
          <span :class="{ k: item.key }">{{ item.step }}</span>
          <i v-if="i < flow.length - 1" aria-hidden="true">→</i>
        </template>
      </div>
      <div class="mb-g4 mb-mt mb-ind">
        <div v-for="tab in navTabs" :key="tab.title" class="mb-tile sm">
          <b>{{ tab.title }}</b>
          <p>{{ tab.text }}</p>
        </div>
      </div>
      <div class="mb-eighty mb-ind">
        <b class="mb-num">~80</b>
        <span>экранов и состояний в Figma: регистрация и анкета, поиск, запись, оплата, чат, видеосессия, оценка</span>
      </div>

      <h3 class="mb-sub">UX-тестирование прототипа</h3>
      <p class="mb-intro mb-ind">
        <mark class="mb-fill">[N участников]</mark>, <mark class="mb-fill">[модерируемый / немодерируемый]</mark>
        тест прототипа. Задача: пройти путь от выбора психолога до записи.
        <mark class="mb-fill">[X из N]</mark> не справились без подсказки
      </p>
      <div class="mb-g2">
        <div class="mb-tile">
          <b class="mb-tt">Терялись среди специалистов</b>
          <p class="mb-was">В прототипе: <mark class="mb-fill">[проверь: много параметров в фильтрах]</mark></p>
          <p class="mb-now">Стало: три фильтра из интервью и частые запросы чипсами</p>
        </div>
        <div class="mb-tile">
          <b class="mb-tt">Не понимали, чем психологи отличаются</b>
          <p class="mb-was">В прототипе: <mark class="mb-fill">[проверь: различия видны только в профилях]</mark></p>
          <p class="mb-now">Стало: подход, опыт и специализации прямо в карточке</p>
        </div>
      </div>
      <div class="mb-outc">Нужно не больше информации, а понятный способ находить, сравнивать и использовать её</div>
    </section>

    <!-- 06 Решения -->
    <section id="solution" class="mb-board sky">
      <div class="mb-bh">
        <div class="mb-bl"><span class="mb-bno">{06}</span><span class="mb-bey">UX/UI-решения</span></div>
        <h2>Четыре изменения <span>ключевого сценария</span></h2>
      </div>
      <div class="mb-sols">
        <div v-for="sol in solutions" :key="sol.screen" class="mb-sol">
          <MindsetPhone :screen="sol.screen" />
          <span class="mb-sn">{{ sol.label }}</span>
          <h4>{{ sol.title }}</h4>
          <ul>
            <li v-for="point in sol.points" :key="point.b">
              <b>{{ point.b }}</b>{{ point.t ? ' ' + point.t : '' }}
            </li>
          </ul>
        </div>
      </div>
      <div class="mb-finale">
        <MindsetPhone screen="done" />
        <div class="mb-fin-t">
          <span class="mb-kick">Финал сценария</span>
          <h3>«Вы записаны» — и сразу понятно, что дальше</h3>
          <p>
            Дата, психолог и три следующих шага: напоминание, ссылка на видео, правила переноса. Отсюда меньше
            вопросов в поддержку
          </p>
        </div>
      </div>
    </section>

    <!-- 07 Дизайн-система -->
    <section id="ds" class="mb-board">
      <div class="mb-bh">
        <div class="mb-bl"><span class="mb-bno">{07}</span><span class="mb-bey">Дизайн-система</span></div>
        <h2>Спокойный визуальный язык <span>для тревожного момента</span></h2>
        <p>
          Приложение делалось с нуля, поэтому сначала — единые правила. Спокойная палитра и выраженная иерархия
          помогают сосредоточиться на выборе
        </p>
      </div>
      <div class="mb-pal mb-ind">
        <div v-for="sw in palette" :key="sw.name">
          <i :style="{ background: sw.color }"></i>
          <b>{{ sw.name }}</b>
          <span>{{ sw.text }}</span>
        </div>
      </div>

      <h3 class="mb-sub">Компоненты</h3>
      <div class="mb-g2">
        <div class="mb-tile">
          <span class="mb-kick">Карточка психолога</span>
          <div class="mb-pc max-w-[340px]">
            <div class="t">
              <span class="mb-av"></span>
              <div class="nm"><b>Илья Соколов</b><span>Гештальт · 5 лет</span></div>
              <span class="r">★ 4,8</span>
            </div>
            <div class="bt"><span class="mb-slot">Завтра в 10:00</span><b>2 500 ₽</b></div>
          </div>
        </div>
        <div class="mb-tile">
          <span class="mb-kick">Слоты времени</span>
          <div class="mb-sg big"><span>17:00</span><span class="on">19:00</span><span>21:00</span></div>
          <span class="mb-kick mt-2">Кнопки</span>
          <div class="mb-btns"><span class="b1">Записаться</span><span class="b2">Написать в чат</span></div>
        </div>
      </div>

      <h3 class="mb-sub">Состояния записи и оплаты</h3>
      <div class="mb-g3">
        <div class="mb-stt ld"><i></i>Загружаем расписание…</div>
        <div class="mb-stt er"><i>!</i>Оплата не прошла. Деньги не списаны</div>
        <div class="mb-stt ok"><i>✓</i>Вы записаны на 22 октября, 19:00</div>
      </div>

      <h3 class="mb-sub">Тексты интерфейса</h3>
      <div class="mb-g3 mb-voice">
        <div v-for="item in voice" :key="item.was">
          <s>{{ item.was }}</s><em>{{ item.now }}</em>
        </div>
      </div>

      <h3 class="mb-sub">Приватность и безопасность</h3>
      <div class="mb-g2">
        <div class="mb-tile mb-todo">
          <span class="mb-kick">✎ если делала</span>
          <b class="mb-tt">Приватность</b>
          <p>
            <mark class="mb-fill">[можно ли не указывать имя, что видит психолог до сессии, где хранится переписка]</mark>
          </p>
        </div>
        <div class="mb-tile mb-todo">
          <span class="mb-kick">✎ если делала</span>
          <b class="mb-tt">Кризисный сценарий</b>
          <p>
            <mark class="mb-fill">[кнопка экстренной помощи, горячие линии, что пишем, если ближайший слот через несколько дней]</mark>
          </p>
        </div>
      </div>
    </section>

    <!-- 08 Команда -->
    <section id="team" class="mb-board violet">
      <div class="mb-bh">
        <div class="mb-bl"><span class="mb-bno">{08}</span><span class="mb-bey">Команда и запуск</span></div>
        <h2>От гипотез <span>до 100% пользователей</span></h2>
      </div>
      <div class="mb-pipe mb-ind">
        <template v-for="(step, i) in pipeline" :key="step">
          <span>{{ step }}</span>
          <i v-if="i < pipeline.length - 1" aria-hidden="true">→</i>
        </template>
      </div>
      <div class="mb-g3 mb-lines">
        <div v-for="item in team" :key="item.title">
          <b>{{ item.title }}</b>
          <p>{{ item.text }}</p>
        </div>
      </div>
    </section>

    <!-- 09 Результаты -->
    <section id="results" class="mb-board dark">
      <div class="mb-bh">
        <div class="mb-bl"><span class="mb-bno">{09}</span><span class="mb-bey">Результаты</span></div>
        <h2>Вдвое быстрее до записи <span>и в полтора раза больше первых записей</span></h2>
      </div>
      <div class="mb-nums">
        <div v-for="m in metrics" :key="m.label" :class="{ key: m.key }">
          <span>{{ m.label }}</span>
          <b class="mb-num">{{ m.value }}</b>
          <em>{{ m.note }}</em>
        </div>
      </div>
      <div class="mb-howm mb-todo">
        <span class="mb-kick">✎ как измеряли</span>
        Сравнивали <mark class="mb-fill">[период до]</mark> и <mark class="mb-fill">[период после]</mark>,
        <mark class="mb-fill">[A/B или до/после релиза]</mark>. Выборка — <mark class="mb-fill">[N пользователей]</mark>,
        данные из <mark class="mb-fill">[AppMetrica / Amplitude]</mark>
      </div>
      <div class="mb-g3 mb-link">
        <div v-for="item in links" :key="item.title">
          <b>{{ item.title }}</b>{{ item.text }}
        </div>
      </div>
      <p class="mb-confirm"><mark class="mb-fill">✎ подтверди связку «решение → метрика»</mark></p>
    </section>

    <!-- 10 Дальше и выводы -->
    <section id="next" class="mb-board">
      <div class="mb-bh">
        <div class="mb-bl"><span class="mb-bno">{10}</span><span class="mb-bey">Дальше и выводы</span></div>
        <h2>Следующий фокус — <span>повторная запись</span></h2>
        <p>
          После первой консультации важно продолжение терапии: записаться к знакомому психологу в один-два тапа,
          не проходя поиск заново
        </p>
      </div>
      <div class="mb-g3">
        <div class="mb-tile">
          <b class="mb-tt">Повторная запись</b>
          <p>С главной и из чата, к своему психологу</p>
        </div>
        <div class="mb-tile">
          <b class="mb-tt">Кризисный сценарий</b>
          <p>Экстренная помощь и горячие линии</p>
        </div>
        <div class="mb-tile">
          <b class="mb-tt">Приватность</b>
          <p>Анонимный режим и понятные правила</p>
        </div>
      </div>
      <div class="mb-bigout">
        <span class="mb-kick">Главный вывод</span>
        <p>
          Эффективность сценария зависит не от количества информации, а от того, как она
          <span class="hl">показана</span> в момент решения
        </p>
      </div>
      <div class="mb-endmark" role="img" aria-label="mindset">m<i></i>ndset</div>
      <div class="mb-foot2">
        <span>Product Designer · Mental HealthTech</span>
        <span>Имена и данные специалистов вымышлены</span>
      </div>
    </section>
  </div>
</template>
