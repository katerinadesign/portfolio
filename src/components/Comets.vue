<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { runnerEvents, runnerPos } from '@/composables/useRunner'

/**
 * Кометы на фоне: время от времени по диагонали пролетает комета с хвостом.
 * Врезаясь в край блока (стекло, карточки, белые сцены с экранами), она рассыпается
 * на искры — они отлетают от края. Если попадает в человечка у курсора — тоже
 * разбивается, а человечку отправляется событие 'hit' (он ойкает).
 * Рисуется на canvas позади контента; при reduced motion комет нет.
 */
const canvas = ref<HTMLCanvasElement | null>(null)

// Во что врезаются кометы
const SOLID = '.glass, .ps-inner, .mb, .rounded-\\[32px\\].bg-white'

interface Comet { x: number; y: number; vx: number; vy: number; len: number }
interface Spark { x: number; y: number; vx: number; vy: number; life: number; max: number; color: string; size: number }
interface Ring { x: number; y: number; t: number }

const SPARK_COLORS = ['#ffffff', '#f2ff94', '#d9ccff', '#ffd6f0']

let timer = 0
let cleanup: (() => void) | null = null

onMounted(() => {
  const el = canvas.value
  if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const ctx = el.getContext('2d')
  if (!ctx) return

  let w = 0
  let h = 0
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const resize = () => {
    w = window.innerWidth
    h = window.innerHeight
    el.width = w * dpr
    el.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  resize()

  const comets: Comet[] = []
  const sparks: Spark[] = []
  const rings: Ring[] = []
  let nextAt = performance.now() + 1500

  const spawn = () => {
    // Сверху, наискосок — то вправо-вниз, то влево-вниз
    const dir = Math.random() < 0.5 ? 1 : -1
    const angle = (20 + Math.random() * 25) * (Math.PI / 180) // от вертикали
    const speed = 7 + Math.random() * 4
    comets.push({
      x: dir > 0 ? Math.random() * w * 0.6 : w * 0.4 + Math.random() * w * 0.6,
      y: -20,
      vx: Math.sin(angle) * speed * dir,
      vy: Math.cos(angle) * speed,
      len: 90 + Math.random() * 70,
    })
  }

  // Искры отлетают от края: nx, ny — нормаль поверхности (куда «наружу»)
  const burst = (x: number, y: number, nx: number, ny: number) => {
    rings.push({ x, y, t: 0 })
    const n = 16 + Math.floor(Math.random() * 8)
    for (let i = 0; i < n; i++) {
      const a = Math.atan2(ny, nx) + (Math.random() - 0.5) * Math.PI * 1.2
      const sp = 1.5 + Math.random() * 4
      const max = 35 + Math.random() * 30
      sparks.push({
        x,
        y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        life: max,
        max,
        color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
        size: 1 + Math.random() * 1.8,
      })
    }
  }

  const solids = () =>
    Array.from(document.querySelectorAll<HTMLElement>(SOLID))
      .map((e) => e.getBoundingClientRect())
      .filter((r) => r.width > 0 && r.bottom > 0 && r.top < h)

  const tick = () => {
    const now = performance.now()
    ctx.clearRect(0, 0, w, h)

    if (now >= nextAt && document.visibilityState === 'visible') {
      spawn()
      nextAt = now + 3500 + Math.random() * 5000
    }

    const rects = comets.length ? solids() : []

    for (let i = comets.length - 1; i >= 0; i--) {
      const c = comets[i]
      const px = c.x
      const py = c.y
      c.x += c.vx
      c.y += c.vy

      // Попала в человечка (тело — примерно 28×40 над точкой у ног)
      if (runnerPos.shown && Math.hypot(c.x - runnerPos.x, c.y - (runnerPos.y - 20)) < 22) {
        burst(c.x, c.y, -c.vx, -c.vy)
        runnerEvents.dispatchEvent(new Event('hit'))
        comets.splice(i, 1)
        continue
      }

      // Врезалась в блок: определяем, через какую сторону вошла
      const hitRect = rects.find((r) => c.x >= r.left && c.x <= r.right && c.y >= r.top && c.y <= r.bottom)
      if (hitRect) {
        let nx = 0
        let ny = 0
        if (py < hitRect.top) ny = -1
        else if (px < hitRect.left) nx = -1
        else if (px > hitRect.right) nx = 1
        else ny = -1
        const ex = nx ? (nx < 0 ? hitRect.left : hitRect.right) : c.x
        const ey = ny ? hitRect.top : c.y
        burst(ex, ey, nx, ny)
        comets.splice(i, 1)
        continue
      }

      if (c.y > h + 40 || c.x < -200 || c.x > w + 200) {
        comets.splice(i, 1)
        continue
      }

      // Хвост — градиентная линия, голова — светящаяся точка
      const sp = Math.hypot(c.vx, c.vy)
      const tx = c.x - (c.vx / sp) * c.len
      const ty = c.y - (c.vy / sp) * c.len
      const g = ctx.createLinearGradient(c.x, c.y, tx, ty)
      g.addColorStop(0, 'rgba(255,255,255,0.55)')
      g.addColorStop(0.3, 'rgba(210,195,255,0.22)')
      g.addColorStop(1, 'rgba(210,195,255,0)')
      ctx.strokeStyle = g
      ctx.lineWidth = 1.6
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(c.x, c.y)
      ctx.lineTo(tx, ty)
      ctx.stroke()

      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.shadowColor = 'rgba(242,255,148,0.8)'
      ctx.shadowBlur = 8
      ctx.beginPath()
      ctx.arc(c.x, c.y, 1.8, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    }

    // Вспышка-кольцо в точке удара
    for (let i = rings.length - 1; i >= 0; i--) {
      const r = rings[i]
      r.t += 1
      const k = r.t / 18
      if (k >= 1) {
        rings.splice(i, 1)
        continue
      }
      ctx.strokeStyle = `rgba(242,255,148,${0.5 * (1 - k)})`
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.arc(r.x, r.y, 4 + k * 18, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Искры: летят, чуть падают вниз, гаснут
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i]
      s.x += s.vx
      s.y += s.vy
      s.vx *= 0.97
      s.vy = s.vy * 0.97 + 0.06
      s.life -= 1
      if (s.life <= 0) {
        sparks.splice(i, 1)
        continue
      }
      ctx.globalAlpha = s.life / s.max
      ctx.fillStyle = s.color
      ctx.fillRect(s.x - s.size / 2, s.y - s.size / 2, s.size, s.size)
    }
    ctx.globalAlpha = 1

  }
  // Таймер ~60 кадров в секунду (requestAnimationFrame здесь срабатывал не везде)
  timer = window.setInterval(tick, 16)

  window.addEventListener('resize', resize)
  cleanup = () => {
    clearInterval(timer)
    window.removeEventListener('resize', resize)
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <canvas ref="canvas" class="comets" aria-hidden="true" />
</template>

<style scoped>
.comets {
  position: fixed;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
