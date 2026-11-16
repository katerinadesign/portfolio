<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { runnerEvents, runnerOn as on, runnerPos, runnerSupported as supported } from '@/composables/useRunner'

/**
 * Человечек-компаньон курсора.
 * Курсор остаётся обычной системной стрелкой, человечек бежит рядом с ним и смотрит на него,
 * меняет цвет в зависимости от направления, болтает фразы в облачке (в том числе про то,
 * на что наведён курсор) и подпрыгивает над кнопками. Рядом поблёскивают звёздочки, при беге
 * за ним остаётся звёздный след. Если в него попадает комета (Comets.vue) — вздрагивает: «Ай-яй-яй!»
 * Включается и выключается тоглом в шапке (RunnerToggle); выбор запоминается.
 * На тач-устройствах и при reduced motion человечка и тогла нет.
 */
const visible = ref(false)
const active = ref(false)
const runner = ref<HTMLDivElement | null>(null)
const bubble = ref<HTMLDivElement | null>(null)
const puffs = ref<HTMLDivElement | null>(null)
const hit = ref(false)
const running = ref(false)
const facingLeft = ref(false)
const runnerColor = ref('#6f4ef0')
const phrase = ref('')
const phraseShown = ref(false)

// Цвет человечка по направлению бега
const DIR_COLORS = { right: '#6f4ef0', left: '#e2489a', up: '#0f9f8c', down: '#ee7426' }

// Фразы: общие — время от времени, остальные — когда курсор над чем-то конкретным
const PHRASES = {
  general: [
    'Ого, что за макеты?',
    'Блин, это, наверное, классный дизайнер',
    'Точно классный дизайнер',
    'Пиксель в пиксель, уважаю',
    'Тут даже отступы красивые',
    'Сетка ровная, я проверил',
    'Я бы нанял. Я бы двоих нанял',
    'Конверсия 18→27%? Серьёзно?!',
    'Кажется, я влюбился в этот UI',
    'Скроль дальше, там интересно',
    'Где тут кнопка «нанять»?',
  ],
  projects: ['Ого, что за макеты?', 'Вот это кейсы…', 'Открой, открой этот!', 'Хочу такое приложение'],
  telegram: ['Пиши, она ответит!', 'Жми, не стесняйся', 'Лучшая кнопка на сайте'],
  resume: ['О, резюме! Качай!', 'Там ещё больше крутого'],
  mail: ['Можно и письмом, по-старинке'],
  hh: ['И на hh тоже есть!'],
  about: ['А вот тут про неё самое интересное', 'Читаю и восхищаюсь'],
  contacts: ['Ну всё, пора писать!', 'Не уходи без сообщения'],
  toggle: ['Эй, не выключай меня!', 'Я же хороший!'],
  caught: ['Фух, догнал', 'Уф… догнал', 'Ха, не убежишь'],
  ouch: ['Ай-яй-яй!', 'Ой! Больно же!', 'Ай! Кто кидается звёздами?', 'Ай-яй-яй, звездопад!'],
}
type PhraseKey = keyof typeof PHRASES
const CONTEXT: [string, PhraseKey][] = [
  ['.fx-toggle', 'toggle'],
  ['[href*="t.me"]', 'telegram'],
  ['[download]', 'resume'],
  ['[href^="mailto"]', 'mail'],
  ['[href*="hh.ru"]', 'hh'],
  ['#projects', 'projects'],
  ['#about', 'about'],
  ['#contacts', 'contacts'],
]

const INTERACTIVE = 'a, button, [role="link"], [role="button"], summary, label'

let cleanup: (() => void) | null = null

onMounted(() => {
  if (!supported) return
  const mouse = { x: innerWidth / 2, y: innerHeight / 2 }
  const runPos = { ...mouse }
  let still = 0
  let runFrames = 0
  let raf = 0

  // Фразы
  let phraseTimer = 0
  let lastPhraseAt = 0
  let lastLine = ''
  let lastContext: PhraseKey | null = null
  const say = (key: PhraseKey, minGap = 3500) => {
    const now = performance.now()
    if (!on.value || !visible.value || now - lastPhraseAt < minGap) return
    const pool = PHRASES[key].filter((l) => l !== lastLine)
    lastLine = pool[Math.floor(Math.random() * pool.length)] ?? PHRASES[key][0]
    phrase.value = lastLine
    phraseShown.value = true
    lastPhraseAt = now
    clearTimeout(phraseTimer)
    clearTimeout(hitTimer)
    runnerEvents.removeEventListener('hit', onHit)
    runnerPos.shown = false
    phraseTimer = window.setTimeout(() => (phraseShown.value = false), 2600)
  }
  const chatter = window.setInterval(() => {
    if (performance.now() - lastPhraseAt > 8000) say('general')
  }, 2500)

  // Звёздный след за бегущим человечком: крошечные звёздочки у ног, гаснут
  let lastPuff = { ...runPos }
  const puff = (x: number, y: number) => {
    const host = puffs.value
    if (!host) return
    const el = document.createElement('i')
    el.className = Math.random() < 0.3 ? 'fx-puff lime' : 'fx-puff'
    el.style.left = `${x + (Math.random() - 0.5) * 14}px`
    el.style.top = `${y - 4 - Math.random() * 14}px`
    el.style.setProperty('--s', String(0.6 + Math.random() * 0.7))
    el.addEventListener('animationend', () => el.remove())
    host.appendChild(el)
  }

  const place = (el: HTMLElement | null, x: number, y: number) => {
    if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  const tick = () => {
    // Человечек стоит сбоку от стрелки, ноги чуть ниже её кончика — так он не закрывает
    // то, на что наведён курсор. Сторона — та, откуда он прибежал
    const side = runPos.x <= mouse.x ? -1 : 1
    const tx = mouse.x + side * 26
    const ty = mouse.y + 34
    const rx = (tx - runPos.x) * 0.22
    const ry = (ty - runPos.y) * 0.22
    runPos.x += rx
    runPos.y += ry
    const rs = Math.hypot(rx, ry)
    if (rs > 0.6) {
      still = 0
      runFrames++
      running.value = true
      runnerColor.value =
        Math.abs(rx) >= Math.abs(ry)
          ? rx > 0 ? DIR_COLORS.right : DIR_COLORS.left
          : ry > 0 ? DIR_COLORS.down : DIR_COLORS.up
      if (Math.hypot(runPos.x - lastPuff.x, runPos.y - lastPuff.y) > 18) {
        lastPuff = { ...runPos }
        puff(runPos.x, runPos.y)
      }
    } else if (++still > 5) {
      if (running.value && runFrames > 60 && Math.random() < 0.35) say('caught')
      running.value = false
      runFrames = 0
    }
    // Всегда смотрит на курсор
    if (Math.abs(mouse.x - runPos.x) > 4) facingLeft.value = mouse.x < runPos.x
    runnerPos.x = runPos.x
    runnerPos.y = runPos.y
    runnerPos.shown = on.value && visible.value
    place(runner.value, runPos.x, runPos.y)
    place(bubble.value, runPos.x, runPos.y - 46)
    raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    mouse.x = e.clientX
    mouse.y = e.clientY
    visible.value = true
  }
  const onLeave = () => (visible.value = false)
  const onOver = (e: PointerEvent) => {
    const t = e.target as Element | null
    active.value = Boolean(t?.closest(INTERACTIVE))
    const ctx = CONTEXT.find(([sel]) => t?.closest(sel))?.[1] ?? null
    if (ctx && ctx !== lastContext) say(ctx, 1200) // то, на что навели, важнее общей болтовни
    lastContext = ctx
  }

  // Попала комета — вздрагивает и ойкает
  let hitTimer = 0
  const onHit = () => {
    hit.value = true
    clearTimeout(hitTimer)
    hitTimer = window.setTimeout(() => (hit.value = false), 700)
    say('ouch', 0)
  }
  runnerEvents.addEventListener('hit', onHit)

  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerover', onOver)
  document.documentElement.addEventListener('pointerleave', onLeave)

  cleanup = () => {
    cancelAnimationFrame(raf)
    clearInterval(chatter)
    clearTimeout(phraseTimer)
    window.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerover', onOver)
    document.documentElement.removeEventListener('pointerleave', onLeave)
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <template v-if="supported">
    <div
      v-show="on"
      class="fx-top"
      :class="{ 'is-visible': visible, 'is-active': active }"
      :style="{ '--rc': runnerColor }"
      aria-hidden="true"
    >
      <!-- Звёздный след за бегущим -->
      <div ref="puffs" class="fx-puffs" />
      <div ref="runner" class="fx-runner">
        <!-- Звёздочки вокруг -->
        <span class="fx-star s1" /><span class="fx-star s2" /><span class="fx-star s3" />
        <div class="fx-runner-body" :class="{ 'is-running': running, 'is-left': facingLeft, 'is-hit': hit }">
          <svg viewBox="0 0 28 40" width="28" height="40">
            <g class="fx-lean">
              <!-- дальние рука и нога — светлее, для объёма -->
              <line class="fx-arm fx-a2 fx-far" x1="14" y1="16" x2="14" y2="24" />
              <line class="fx-leg fx-l2 fx-far" x1="14" y1="25" x2="14" y2="37" />
              <line class="fx-torso" x1="14" y1="14" x2="14" y2="25" />
              <line class="fx-leg fx-l1" x1="14" y1="25" x2="14" y2="37" />
              <line class="fx-arm fx-a1" x1="14" y1="16" x2="14" y2="24" />
              <circle class="fx-head" cx="14" cy="7.5" r="6" />
              <circle class="fx-eye" cx="17" cy="6.5" r="1.5" />
            </g>
          </svg>
        </div>
      </div>
      <div ref="bubble" class="fx-bubble" :class="{ 'is-shown': phraseShown }">
        <span>{{ phrase }}</span>
      </div>
    </div>

  </template>
</template>

<style>
.fx-top {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.25s ease-out;
}
.fx-top.is-visible {
  opacity: 1;
}
.fx-runner,
.fx-bubble {
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
}

/* Звёздочки вокруг человечка — мерцают по очереди */
.fx-star {
  position: absolute;
  width: 7px;
  height: 7px;
  background: #f4f1ff;
  clip-path: polygon(50% 0, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%);
  opacity: 0;
  animation: fx-twinkle 2.6s ease-in-out infinite;
}
.fx-star.s1 { left: -22px; top: -42px; width: 5px; height: 5px; }
.fx-star.s2 { left: 16px; top: -30px; width: 4px; height: 4px; animation-delay: 0.9s; }
.fx-star.s3 { left: -26px; top: -14px; width: 3px; height: 3px; animation-delay: 1.7s; background: var(--color-accent); }
@keyframes fx-twinkle {
  0%, 100% { opacity: 0; scale: 0.4; }
  50% { opacity: 0.8; scale: 1; }
}

/* Звёздный след за бегущим */
.fx-puffs {
  position: absolute;
  inset: 0;
}
.fx-puff {
  position: absolute;
  width: 5px;
  height: 5px;
  margin: -2.5px 0 0 -2.5px;
  background: #f4f1ff;
  clip-path: polygon(50% 0, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%);
  opacity: 0.7;
  scale: var(--s);
  animation: fx-trail 0.8s ease-out forwards;
}
.fx-puff.lime {
  background: var(--color-accent);
}
@keyframes fx-trail {
  to {
    opacity: 0;
    scale: 0.2;
    rotate: 90deg;
    translate: 0 6px;
  }
}

/* Попала комета: вздрагивает и откидывается */
.fx-runner-body.is-hit svg {
  animation: fx-ouch 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) !important;
}
@keyframes fx-ouch {
  0% { translate: 0 0; rotate: 0deg; }
  20% { translate: -4px -6px; rotate: -18deg; }
  40% { translate: 3px -2px; rotate: 12deg; }
  60% { translate: -2px 0; rotate: -6deg; }
  100% { translate: 0 0; rotate: 0deg; }
}

/* Человечек */
.fx-runner-body {
  margin: -40px 0 0 -14px; /* ноги — в точке привязки */
  transition: scale 0.18s;
}
.fx-runner-body.is-left {
  scale: -1 1;
}
.fx-runner svg {
  display: block;
  overflow: visible;
  stroke-linecap: round;
}
.fx-runner line {
  stroke: var(--rc);
  stroke-width: 3.6;
  transition: stroke 0.35s;
}
.fx-runner .fx-torso {
  stroke-width: 6;
}
.fx-runner .fx-far {
  opacity: 0.55;
}
.fx-head {
  fill: var(--rc);
  transition: fill 0.35s;
}
.fx-eye {
  fill: #fff;
}
.fx-lean {
  transform-origin: 14px 37px;
  transition: rotate 0.25s ease-out;
}
.is-running .fx-lean {
  rotate: 10deg; /* наклон вперёд, по ходу бега */
}
.fx-arm {
  transform-origin: 14px 16px;
}
.fx-leg {
  transform-origin: 14px 25px;
}
.fx-a1 { rotate: 10deg; }
.fx-a2 { rotate: -10deg; }
.fx-l1 { rotate: 5deg; }
.fx-l2 { rotate: -5deg; }
.is-running .fx-l1,
.is-running .fx-a2 {
  animation: fx-swing 0.32s ease-in-out infinite alternate;
}
.is-running .fx-l2,
.is-running .fx-a1 {
  animation: fx-swing 0.32s ease-in-out infinite alternate-reverse;
}
.is-running svg {
  animation: fx-bob 0.16s ease-in-out infinite alternate;
}
@keyframes fx-swing {
  from { rotate: -42deg; }
  to { rotate: 42deg; }
}
@keyframes fx-bob {
  from { translate: 0 0; }
  to { translate: 0 -2px; }
}
/* Над кнопками — подпрыгивает от радости (на месте, курсор не трогает) */
.fx-top.is-active .fx-runner svg {
  animation: fx-jump 0.5s cubic-bezier(0.3, 0, 0.3, 1) infinite;
}
@keyframes fx-jump {
  0%, 100% { translate: 0 0; }
  45% { translate: 0 -8px; }
}

/* Облачко с фразой — стеклянное, без обводки */
.fx-bubble span {
  position: absolute;
  bottom: 0;
  left: 0;
  translate: -50% 0;
  width: max-content;
  max-width: 220px;
  padding: 8px 12px;
  border-radius: 14px;
  background: rgb(46 38 84 / 0.6);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  color: #fff;
  font: 600 13px/1.3 var(--font-sans);
  text-align: center;
  transition:
    opacity 0.2s,
    scale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: 50% 100%;
  opacity: 0;
  scale: 0.6;
}
.fx-bubble.is-shown span {
  opacity: 1;
  scale: 1;
}
</style>
