<!--
  DotGrid из Vue Bits — https://vue-bits.dev/backgrounds/dot-grid
  Copyright (c) 2025 David Haz, MIT + Commons Clause.
  Изменения: пропсы activeScale / activeAlpha — точки в радиусе proximity увеличиваются
  и становятся полупрозрачными (activeAlpha — непрозрачность на краю зоны, к центру растёт до activeAlphaMax);
  solidRadius — радиус (px), внутри которого точки сплошного activeColor без прозрачности;
  scaleSteps — ступенчатый масштаб по кольцам сетки от курсора: [1.3, 1, 0.8, …] — доля
  activeScale для 1-го, 2-го, 3-го… кольца (можно > 1); дальше списка — базовые точки (заменяет solidRadius);
  ringEdges — внешние радиусы колец (px) для scaleSteps, напр. [26, 40, 52, 64]; пусто — кольцо равно шагу сетки;
  follow — плавность следования зоны за курсором (1 — мгновенно, меньше — с отставанием);
  trailFade — след: там, где прошёл курсор, точки гаснут за столько мс (0 — без следа);
  moveThrottle — частота обновления курсора (0 — без троттлинга).
-->
<template>
  <section :class="`flex items-center justify-center h-full w-full relative ${className}`" :style="style">
    <div ref="wrapperRef" class="relative w-full h-full">
      <canvas ref="canvasRef" class="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { computed, nextTick, onMounted, onUnmounted, ref, useTemplateRef, watch, type CSSProperties } from 'vue';

gsap.registerPlugin(InertiaPlugin);

const throttle = <T extends unknown[]>(func: (...args: T) => void, limit: number) => {
  let lastCall = 0;
  return function (this: unknown, ...args: T) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  _inertiaApplied: boolean;
  level: number;
}

export interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  activeScale?: number;
  activeAlpha?: number;
  activeAlphaMax?: number;
  moveThrottle?: number;
  solidRadius?: number;
  scaleSteps?: number[];
  ringEdges?: number[];
  follow?: number;
  trailFade?: number;
  className?: string;
  style?: CSSProperties;
}

const props = withDefaults(defineProps<DotGridProps>(), {
  dotSize: 16,
  gap: 32,
  baseColor: '#27FF64',
  activeColor: '#27FF64',
  proximity: 150,
  speedTrigger: 100,
  shockRadius: 250,
  shockStrength: 5,
  maxSpeed: 5000,
  resistance: 750,
  returnDuration: 1.5,
  activeScale: 1,
  activeAlpha: 1,
  activeAlphaMax: 1,
  moveThrottle: 50,
  solidRadius: 0,
  scaleSteps: () => [],
  ringEdges: () => [],
  follow: 1,
  trailFade: 0,
  className: '',
  style: () => ({})
});

const wrapperRef = useTemplateRef<HTMLDivElement>('wrapperRef');
const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef');
const dots = ref<Dot[]>([]);
const smoothPointer = { x: 0, y: 0, ready: false };
let lastDrawTime = 0;
const pointer = ref({
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  speed: 0,
  lastTime: 0,
  lastX: 0,
  lastY: 0
});

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

const baseRgb = computed(() => hexToRgb(props.baseColor));
const activeRgb = computed(() => hexToRgb(props.activeColor));

const circlePath = computed(() => {
  if (typeof window === 'undefined' || !window.Path2D) return null;

  const p = new Path2D();
  p.arc(0, 0, props.dotSize / 2, 0, Math.PI * 2);
  return p;
});

const buildGrid = () => {
  const wrap = wrapperRef.value;
  const canvas = canvasRef.value;
  if (!wrap || !canvas) return;

  const { width, height } = wrap.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  const ctx = canvas.getContext('2d');
  if (ctx) ctx.scale(dpr, dpr);

  const cols = Math.floor((width + props.gap) / (props.dotSize + props.gap));
  const rows = Math.floor((height + props.gap) / (props.dotSize + props.gap));
  const cell = props.dotSize + props.gap;

  const gridW = cell * cols - props.gap;
  const gridH = cell * rows - props.gap;

  const extraX = width - gridW;
  const extraY = height - gridH;

  const startX = extraX / 2 + props.dotSize / 2;
  const startY = extraY / 2 + props.dotSize / 2;

  const newDots: Dot[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cx = startX + x * cell;
      const cy = startY + y * cell;
      newDots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false, level: 0 });
    }
  }
  dots.value = newDots;
};

let rafId: number;
let resizeObserver: ResizeObserver | null = null;

const draw = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Зона плавно догоняет курсор (follow = 1 — без задержки)
  const sp = smoothPointer;
  sp.x += (pointer.value.x - sp.x) * props.follow;
  sp.y += (pointer.value.y - sp.y) * props.follow;
  const { x: px, y: py } = sp;
  const proxSq = props.proximity * props.proximity;

  const now = performance.now();
  const dt = lastDrawTime ? Math.min(now - lastDrawTime, 100) : 16;
  lastDrawTime = now;
  const decay = props.trailFade > 0 ? dt / props.trailFade : 1;

  for (const dot of dots.value) {
    const ox = dot.cx + dot.xOffset;
    const oy = dot.cy + dot.yOffset;
    const dx = dot.cx - px;
    const dy = dot.cy - py;
    const dsq = dx * dx + dy * dy;

    let style = props.baseColor;
    let scale = 1;
    let alpha = 1;

    // k = 1 внутри solidRadius (сплошной цвет без прозрачности), к краю зоны падает до 0
    let kNow = 0;
    if (dsq <= proxSq) {
      const dist = Math.sqrt(dsq);
      if (props.scaleSteps.length > 0) {
        // Ступени: кольцо задаётся внешними радиусами ringEdges, иначе — шагом сетки
        // (ближайшие точки — кольцо 0)
        let ring: number;
        if (props.ringEdges.length > 0) {
          ring = props.ringEdges.findIndex(edge => dist <= edge);
          if (ring < 0) ring = props.ringEdges.length;
        } else {
          ring = Math.max(0, Math.round(dist / (props.dotSize + props.gap)) - 1);
        }
        kNow = props.scaleSteps[ring] ?? 0;
      } else {
        const band = Math.max(props.proximity - props.solidRadius, 1e-3);
        kNow = dist <= props.solidRadius ? 1 : Math.max(0, 1 - (dist - props.solidRadius) / band);
      }
    }
    // След: уровень точки плавно гаснет за trailFade мс, но не ниже текущего
    dot.level = Math.max(kNow, dot.level - decay);
    const k = dot.level;

    if (k > 0) {
      // Доля для цвета и прозрачности (0–1): со ступенями — относительно первого кольца,
      // чтобы дальние кольца были светлее и прозрачнее; иначе k, но не больше 1
      const kc =
        props.scaleSteps.length > 0 ? Math.min(1, Math.sqrt(k / props.scaleSteps[0])) : Math.min(k, 1);
      // С увеличением точек цвет набирается быстрее (по sqrt), как и размер
      const tc = props.activeScale > 1 ? Math.sqrt(kc) : kc;
      const r = Math.round(baseRgb.value.r + (activeRgb.value.r - baseRgb.value.r) * tc);
      const g = Math.round(baseRgb.value.g + (activeRgb.value.g - baseRgb.value.g) * tc);
      const b = Math.round(baseRgb.value.b + (activeRgb.value.b - baseRgb.value.b) * tc);
      style = `rgb(${r},${g},${b})`;
      // Внутри solidRadius — максимальный размер, непрозрачные, сливаются в один цвет без просветов;
      // к краю зоны уменьшаются и становятся полупрозрачными
      // Со ступенями масштаб берётся как есть (1, 0.8, 0.5…), иначе сглаживается по sqrt
      scale = 1 + (props.activeScale - 1) * (props.scaleSteps.length > 0 ? k : Math.sqrt(k));
      const targetAlpha = props.activeAlpha + (props.activeAlphaMax - props.activeAlpha) * kc * kc;
      alpha = 1 + (targetAlpha - 1) * Math.min(1, kc * 8);
    }

    if (circlePath.value) {
      ctx.save();
      ctx.translate(ox, oy);
      ctx.scale(scale, scale);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = style;
      ctx.fill(circlePath.value);
      ctx.restore();
    }
  }

  rafId = requestAnimationFrame(draw);
};

const onMove = (e: MouseEvent) => {
  const now = performance.now();
  const pr = pointer.value;
  const dt = pr.lastTime ? now - pr.lastTime : 16;
  const dx = e.clientX - pr.lastX;
  const dy = e.clientY - pr.lastY;
  let vx = (dx / dt) * 1000;
  let vy = (dy / dt) * 1000;
  let speed = Math.hypot(vx, vy);
  if (speed > props.maxSpeed) {
    const scale = props.maxSpeed / speed;
    vx *= scale;
    vy *= scale;
    speed = props.maxSpeed;
  }
  pr.lastTime = now;
  pr.lastX = e.clientX;
  pr.lastY = e.clientY;
  pr.vx = vx;
  pr.vy = vy;
  pr.speed = speed;

  const canvas = canvasRef.value;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  pr.x = e.clientX - rect.left;
  pr.y = e.clientY - rect.top;
  if (!smoothPointer.ready) {
    smoothPointer.x = pr.x;
    smoothPointer.y = pr.y;
    smoothPointer.ready = true;
  }

  for (const dot of dots.value) {
    const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
    if (speed > props.speedTrigger && dist < props.proximity && !dot._inertiaApplied) {
      dot._inertiaApplied = true;
      gsap.killTweensOf(dot);
      const pushX = dot.cx - pr.x + vx * 0.005;
      const pushY = dot.cy - pr.y + vy * 0.005;
      gsap.to(dot, {
        inertia: { xOffset: pushX, yOffset: pushY, resistance: props.resistance },
        onComplete: () => {
          gsap.to(dot, {
            xOffset: 0,
            yOffset: 0,
            duration: props.returnDuration,
            ease: 'elastic.out(1,0.75)'
          });
          dot._inertiaApplied = false;
        }
      });
    }
  }
};

const onClick = (e: MouseEvent) => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const cx = e.clientX - rect.left;
  const cy = e.clientY - rect.top;
  for (const dot of dots.value) {
    const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
    if (dist < props.shockRadius && !dot._inertiaApplied) {
      dot._inertiaApplied = true;
      gsap.killTweensOf(dot);
      const falloff = Math.max(0, 1 - dist / props.shockRadius);
      const pushX = (dot.cx - cx) * props.shockStrength * falloff;
      const pushY = (dot.cy - cy) * props.shockStrength * falloff;
      gsap.to(dot, {
        inertia: { xOffset: pushX, yOffset: pushY, resistance: props.resistance },
        onComplete: () => {
          gsap.to(dot, {
            xOffset: 0,
            yOffset: 0,
            duration: props.returnDuration,
            ease: 'elastic.out(1,0.75)'
          });
          dot._inertiaApplied = false;
        }
      });
    }
  }
};

const throttledMove = throttle(onMove, props.moveThrottle);

onMounted(async () => {
  await nextTick();

  buildGrid();

  if (circlePath.value) {
    draw();
  }

  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(buildGrid);
    if (wrapperRef.value) {
      resizeObserver.observe(wrapperRef.value);
    }
  } else {
    (window as Window).addEventListener('resize', buildGrid);
  }

  window.addEventListener('mousemove', throttledMove, { passive: true });
  window.addEventListener('click', onClick);
});

onUnmounted(() => {
  if (rafId) {
    cancelAnimationFrame(rafId);
  }

  if (resizeObserver) {
    resizeObserver.disconnect();
  } else {
    window.removeEventListener('resize', buildGrid);
  }

  window.removeEventListener('mousemove', throttledMove);
  window.removeEventListener('click', onClick);
});

watch([() => props.dotSize, () => props.gap], () => {
  buildGrid();
});

watch([() => props.proximity, () => props.baseColor, activeRgb, baseRgb, circlePath], () => {
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
  if (circlePath.value) {
    draw();
  }
});
</script>
