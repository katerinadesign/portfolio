<script setup lang="ts">
import { computed } from 'vue'
import './mock.css'

/**
 * Макет экрана приложения Mindset в рамке телефона, свёрстанный кодом.
 * Для скринридера это одна картинка с подписью (role="img").
 */
export type MindsetScreen = 'catalog' | 'filtered' | 'filters' | 'profile' | 'booking' | 'done'

const props = defineProps<{ screen: MindsetScreen }>()

const labels: Record<MindsetScreen, string> = {
  catalog: 'Каталог психологов: поиск, быстрые фильтры и карточки с ценой и ближайшим временем',
  filtered: 'Каталог после фильтров: 12 психологов, у каждого цена и ближайшее время',
  filters: 'Фильтры каталога: запрос, стоимость и время',
  profile: 'Профиль психолога: рейтинг, опыт и цена, специализации, образование и отзывы',
  booking: 'Запись, шаг 1 из 2: выбор дня и свободного времени',
  done: 'Подтверждение записи и что будет дальше',
}

const label = computed(() => labels[props.screen])

const specialists = {
  anna: { ava: 'a', name: 'Анна Лебедева', about: 'КПТ · 7 лет практики', rate: '4,9', tags: ['Выгорание', 'Тревога'], price: '2 800 ₽' },
  ilya: { ava: 'b', name: 'Илья Соколов', about: 'Гештальт · 5 лет', rate: '4,8', tags: ['Выгорание', 'Самооценка'], price: '2 500 ₽' },
  maria: { ava: 'c', name: 'Мария Орлова', about: 'Схема-терапия · 9 лет', rate: '5,0', tags: ['Выгорание'], price: '3 000 ₽' },
}

const catalogCards = computed(() =>
  props.screen === 'catalog'
    ? [
        { ...specialists.anna, slot: 'Сегодня в 19:00', hl: false },
        { ...specialists.ilya, slot: 'Завтра в 10:00', hl: false },
      ]
    : [
        { ...specialists.anna, slot: 'Сегодня в 19:00', hl: true },
        { ...specialists.maria, slot: 'Сегодня в 21:00', hl: false },
      ],
)

const tabs = ['Главная', 'Каталог', 'Чат', 'Аккаунт']
const days = [
  { d: '22', w: 'чт', state: 'on' },
  { d: '23', w: 'пт', state: '' },
  { d: '24', w: 'сб', state: '' },
  { d: '25', w: 'вс', state: 'off' },
  { d: '26', w: 'пн', state: '' },
]
const slots = [
  { t: '17:00', state: '' },
  { t: '19:00', state: 'on' },
  { t: '20:00', state: '' },
  { t: '21:00', state: 'off' },
]
</script>

<template>
  <div class="mm mm-phone" role="img" :aria-label="label">
    <div class="mm-sb"><span>9:41</span><i></i></div>

    <!-- Каталог: общий и после фильтров -->
    <template v-if="screen === 'catalog' || screen === 'filtered'">
      <div class="mm-h">
        <b>Психологи</b><span class="mm-cnt">{{ screen === 'catalog' ? 48 : 12 }}</span>
      </div>
      <template v-if="screen === 'catalog'">
        <div class="mm-search">Тревога, выгорание, отношения…</div>
        <div class="mm-chips">
          <span class="on">Выгорание</span><span>до 3 000 ₽</span><span>Сегодня</span><span>Фильтры · 2</span>
        </div>
      </template>
      <div v-else class="mm-chips">
        <span class="on">Выгорание</span><span class="on">до 3 000 ₽</span><span class="on">Сегодня</span>
      </div>
      <div v-for="card in catalogCards" :key="card.name" class="mm-card" :class="{ hl: card.hl }">
        <div class="mm-row">
          <span class="mm-ava" :class="card.ava"></span>
          <div><b>{{ card.name }}</b><span>{{ card.about }}</span></div>
          <span class="mm-rate">{{ card.rate }}</span>
        </div>
        <div class="mm-tags"><span v-for="tag in card.tags" :key="tag">{{ tag }}</span></div>
        <div class="mm-foot"><span class="mm-slot">{{ card.slot }}</span><b>{{ card.price }}</b></div>
      </div>
      <div class="mm-tab">
        <span v-for="tab in tabs" :key="tab" :class="{ on: tab === 'Каталог' }">{{ tab }}</span>
      </div>
    </template>

    <template v-else-if="screen === 'filters'">
      <div class="mm-nav">Фильтры</div>
      <span class="mm-lab">Запрос</span>
      <div class="mm-chips wrap">
        <span class="on">Выгорание</span><span>Тревога</span><span>Отношения</span><span>Самооценка</span><span>Стресс</span>
      </div>
      <span class="mm-lab">Стоимость</span>
      <div class="mm-range"><i></i><span>1 500 ₽</span><span>3 000 ₽</span></div>
      <span class="mm-lab">Когда</span>
      <div class="mm-chips wrap"><span class="on">Сегодня</span><span>Завтра</span><span>На неделе</span></div>
      <div class="mm-btn">Показать 12 психологов</div>
    </template>

    <template v-else-if="screen === 'profile'">
      <div class="mm-nav">‹ Каталог</div>
      <div class="mm-prof">
        <span class="mm-ava a big"></span>
        <b>Анна Лебедева</b>
        <span>Когнитивно-поведенческая терапия</span>
        <div class="mm-stats">
          <div><b>4,9</b><span>62 отзыва</span></div>
          <div><b>7 лет</b><span>практики</span></div>
          <div><b>2 800 ₽</b><span>50 минут</span></div>
        </div>
      </div>
      <div class="mm-blk">
        <span class="mm-lab">Работает с</span>
        <div class="mm-tags"><span>Выгорание</span><span>Тревога</span><span>Стресс на работе</span></div>
      </div>
      <div class="mm-blk">
        <span class="mm-lab">Образование</span>
        <span class="mm-txt">МГУ, факультет психологии · Программа КПТ, 2019</span>
      </div>
      <div class="mm-blk">
        <span class="mm-lab">Отзывы</span>
        <span class="mm-txt">«Помогла разложить тревогу по полочкам уже на первой встрече»</span>
      </div>
      <div class="mm-btn">Записаться · сегодня в 19:00</div>
    </template>

    <template v-else-if="screen === 'booking'">
      <div class="mm-nav">‹ Запись · шаг 1 из 2</div>
      <div class="mm-mini">
        <span class="mm-ava a"></span>
        <div><b>Анна Лебедева</b><span>2 800 ₽ · 50 минут</span></div>
      </div>
      <div class="mm-days">
        <span v-for="day in days" :key="day.d" :class="day.state"><b>{{ day.d }}</b>{{ day.w }}</span>
      </div>
      <span class="mm-lab">Свободное время</span>
      <div class="mm-slots">
        <span v-for="slot in slots" :key="slot.t" :class="slot.state">{{ slot.t }}</span>
      </div>
      <div class="mm-note">Видеосессия в приложении. Ссылка придёт в чат за 15 минут</div>
      <div class="mm-btn">К оплате · 2 800 ₽</div>
    </template>

    <template v-else>
      <div class="mm-ok">✓</div>
      <b class="mm-title">Вы записаны</b>
      <span class="mm-sub">Четверг, 22 октября, 19:00</span>
      <div class="mm-card">
        <div class="mm-row">
          <span class="mm-ava a"></span>
          <div><b>Анна Лебедева</b><span>Видеосессия · 50 минут</span></div>
        </div>
      </div>
      <div class="mm-steps">
        <div><i>1</i><span>Напоминание придёт за час</span></div>
        <div><i>2</i><span>Ссылка на видео — в чате за 15 минут</span></div>
        <div><i>3</i><span>Перенести можно за 24 часа</span></div>
      </div>
      <div class="mm-btn">Открыть чат</div>
    </template>
  </div>
</template>
