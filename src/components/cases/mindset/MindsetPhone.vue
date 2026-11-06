<script setup lang="ts">
import { computed } from 'vue'

/** Экран приложения Mindset в рамке телефона, свёрстанный кодом (стили — в board.css) */
export type MindsetScreen = 'filters' | 'catalog' | 'profile' | 'booking' | 'done'

const props = defineProps<{ screen: MindsetScreen }>()

const labels: Record<MindsetScreen, string> = {
  filters: 'Экран фильтров: запрос, стоимость и время',
  catalog: 'Экран каталога: карточки психологов с ценой и ближайшим временем',
  profile: 'Экран профиля психолога: рейтинг, опыт, цена, специализации и образование',
  booking: 'Экран записи: выбор дня и свободного времени',
  done: 'Экран подтверждения записи и следующих шагов',
}

const label = computed(() => labels[props.screen])

const specialists = [
  { name: 'Анна Лебедева', about: 'КПТ · 7 лет практики', rate: '4,9', slot: 'Сегодня в 19:00', price: '2 800 ₽' },
  { name: 'Мария Орлова', about: 'Схема-терапия · 9 лет', rate: '5,0', slot: 'Сегодня в 21:00', price: '3 000 ₽' },
  { name: 'Илья Соколов', about: 'Гештальт · 5 лет', rate: '4,8', slot: 'Сегодня в 20:00', price: '2 500 ₽' },
]

const tabs = ['Главная', 'Каталог', 'Чат', 'Аккаунт']
const days = [
  { d: '22', w: 'чт' },
  { d: '23', w: 'пт' },
  { d: '24', w: 'сб' },
  { d: '25', w: 'вс' },
  { d: '26', w: 'пн' },
]
const slots = ['17:00', '19:00', '20:00', '21:00']
const nextSteps = ['Напоминание придёт за час', 'Ссылка на видео — в чате за 15 минут', 'Перенести можно за 24 часа']
</script>

<template>
  <div class="mb-ph" role="img" :aria-label="label">
    <div class="sb">9:41</div>

    <template v-if="screen === 'filters'">
      <div class="back">‹ Фильтры</div>
      <div class="fl">
        <div>
          <b>Запрос</b>
          <div class="mb-chips wr">
            <span class="on">Выгорание</span><span>Тревога</span><span>Отношения</span><span>Самооценка</span
            ><span>Стресс</span>
          </div>
        </div>
        <div>
          <b>Стоимость</b>
          <div class="mb-rng"></div>
          <div class="mb-rv"><span>1 500 ₽</span><span>3 000 ₽</span></div>
        </div>
        <div>
          <b>Когда</b>
          <div class="mb-chips wr"><span class="on">Сегодня</span><span>Завтра</span><span>На неделе</span></div>
        </div>
      </div>
      <div class="mb-cta">Показать 12 психологов</div>
    </template>

    <template v-else-if="screen === 'catalog'">
      <div class="hd">
        <h4>Психологи <small>12</small></h4>
      </div>
      <div class="mb-chips"><span class="on">Выгорание</span><span class="on">до 3 000 ₽</span><span class="on">Сегодня</span></div>
      <div class="list">
        <div v-for="s in specialists" :key="s.name" class="mb-pc">
          <div class="t">
            <span class="mb-av"></span>
            <div class="nm">
              <b>{{ s.name }}</b><span>{{ s.about }}</span>
            </div>
            <span class="r">★ {{ s.rate }}</span>
          </div>
          <div class="mb-tg"><span>Выгорание</span><span>Тревога</span></div>
          <div class="bt">
            <span class="mb-slot">{{ s.slot }}</span><b>{{ s.price }}</b>
          </div>
        </div>
      </div>
      <div class="mb-tabbar">
        <span v-for="tab in tabs" :key="tab" :class="{ on: tab === 'Каталог' }"><i></i>{{ tab }}</span>
      </div>
    </template>

    <template v-else-if="screen === 'profile'">
      <div class="back">‹ Каталог</div>
      <div class="prof">
        <div class="pt">
          <span class="mb-bigav"></span>
          <h5>Анна Лебедева</h5>
          <span>Когнитивно-поведенческая терапия</span>
        </div>
        <div class="mb-stat3">
          <div><b>★ 4,9</b><span>62 отзыва</span></div>
          <div><b>7 лет</b><span>практики</span></div>
          <div><b>2 800 ₽</b><span>50 минут</span></div>
        </div>
        <div class="blk">
          <b>Работает с</b>
          <div class="mb-tg"><span>Выгорание</span><span>Тревога</span><span>Стресс на работе</span></div>
        </div>
        <div class="blk">
          <b>Образование</b>
          <p>МГУ, факультет психологии · Программа КПТ, 2019</p>
        </div>
        <div class="rev">«Помогла разложить тревогу по полочкам уже на первой встрече»</div>
      </div>
      <div class="mb-cta">Записаться · сегодня в 19:00</div>
    </template>

    <template v-else-if="screen === 'booking'">
      <div class="back">‹ Запись · шаг 1 из 2</div>
      <div class="mini">
        <span class="mb-av"></span>
        <div><b>Анна Лебедева</b><span>2 800 ₽ · 50 минут</span></div>
      </div>
      <div class="days">
        <div v-for="(day, i) in days" :key="day.d" :class="{ on: i === 0 }">
          <b>{{ day.d }}</b><span>{{ day.w }}</span>
        </div>
      </div>
      <div class="slots">
        <b>Свободное время</b>
        <div class="mb-sg">
          <span v-for="slot in slots" :key="slot" :class="{ on: slot === '19:00' }">{{ slot }}</span>
        </div>
        <div class="note">Видеосессия в приложении. Ссылка придёт в чат за 15 минут</div>
      </div>
      <div class="mb-cta">К оплате · 2 800 ₽</div>
    </template>

    <template v-else>
      <div class="okp">
        <div class="ic">✓</div>
        <h5>Вы записаны</h5>
        <b>Четверг, 22 октября, 19:00</b>
        <span>Анна Лебедева · видеосессия · 50 минут</span>
        <div class="steps">
          <div v-for="(step, i) in nextSteps" :key="step"><i>{{ i + 1 }}</i>{{ step }}</div>
        </div>
      </div>
      <div class="mb-cta">Открыть чат</div>
    </template>
  </div>
</template>
