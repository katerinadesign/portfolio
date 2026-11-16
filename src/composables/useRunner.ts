import { ref, watch } from 'vue'

/**
 * Общее состояние человечка у курсора: включён ли он (запоминается) и поддерживается ли
 * устройством (нужна мышь; при reduced motion — выключено).
 */
export const runnerSupported =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

const readSaved = () => {
  try {
    return localStorage.getItem('runner') !== 'off'
  } catch {
    return true
  }
}

export const runnerOn = ref(readSaved())

watch(runnerOn, (v) => {
  try {
    localStorage.setItem('runner', v ? 'on' : 'off')
  } catch {}
})

/**
 * Где сейчас человечек (точка у ног, в координатах окна) — для комет: если комета
 * попадает в человечка, она разбивается, а он реагирует. Обновляется каждый кадр, без реактивности.
 */
export const runnerPos = { x: 0, y: 0, shown: false }

/** События человечка: 'hit' — в него попала комета */
export const runnerEvents = new EventTarget()
