<script setup lang="ts">
/**
 * «Космос» в самом низу главной — пасхалка для тех, кто долистал:
 * планета-горизонт, планета с кольцом и луна плавают, по планете гуляет динозавр,
 * над ней висит НЛО и лучом затягивает камушек, рядом машут инопланетяне, парит космонавт,
 * время от времени дугой пролетает ракета. Сцена — на всю ширину до самого низа страницы.
 * Чистое SVG + CSS-анимации,
 * при reduced motion всё стоит на месте.
 */
</script>

<template>
  <!-- Отрицательные отступы — на всю ширину и до низа, перекрывая поля Layout -->
  <section class="space -mx-2 -mb-10 sm:-mx-4 lg:-mx-10" aria-label="Конец страницы">
    <svg viewBox="0 0 1440 480" preserveAspectRatio="xMidYMax slice" class="space-svg" aria-hidden="true">
      <defs>
        <radialGradient id="sp-ground" cx="50%" cy="0%" r="80%">
          <stop offset="0" stop-color="#5b45b8" />
          <stop offset="0.6" stop-color="#2f2560" />
          <stop offset="1" stop-color="#1e1a33" />
        </radialGradient>
        <radialGradient id="sp-ringed" cx="35%" cy="35%" r="70%">
          <stop offset="0" stop-color="#ffb7e3" />
          <stop offset="1" stop-color="#9a4fd6" />
        </radialGradient>
        <radialGradient id="sp-moon" cx="35%" cy="35%" r="70%">
          <stop offset="0" stop-color="#fbffd9" />
          <stop offset="1" stop-color="#c9d86a" />
        </radialGradient>
        <linearGradient id="sp-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#f2ff94" stop-opacity="0.55" />
          <stop offset="1" stop-color="#f2ff94" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- Планета с кольцом -->
      <g class="bob slow">
        <ellipse cx="230" cy="130" rx="86" ry="18" fill="none" stroke="#d9ccff" stroke-opacity="0.5" stroke-width="5" />
        <circle cx="230" cy="130" r="46" fill="url(#sp-ringed)" />
        <path d="M144 130 A86 18 0 0 0 316 130" fill="none" stroke="#d9ccff" stroke-opacity="0.7" stroke-width="5" />
      </g>

      <!-- Луна -->
      <g class="drift">
        <circle cx="1240" cy="80" r="22" fill="url(#sp-moon)" />
        <circle cx="1233" cy="74" r="4" fill="#b6c25a" />
        <circle cx="1248" cy="88" r="3" fill="#b6c25a" />
      </g>

      <!-- Маленькие планетки -->
      <circle cx="620" cy="70" r="7" fill="#9be7d4" class="twinkle" />
      <circle cx="900" cy="130" r="4" fill="#ffd6f0" class="twinkle d2" />

      <!-- Космонавт парит и медленно кувыркается -->
      <g class="astro-float">
        <g class="astro">
          <rect x="-11" y="-6" width="22" height="26" rx="9" fill="#eeeaff" />
          <rect x="-8" y="2" width="16" height="9" rx="3" fill="#cfc6f5" />
          <circle cx="0" cy="-14" r="13" fill="#eeeaff" />
          <ellipse cx="2" cy="-14" rx="8" ry="7" fill="#2f2560" />
          <ellipse cx="5" cy="-17" rx="2.5" ry="1.8" fill="#f2ff94" fill-opacity="0.8" />
          <rect x="-19" y="-2" width="9" height="6" rx="3" fill="#eeeaff" transform="rotate(-30)" />
          <rect x="10" y="2" width="9" height="6" rx="3" fill="#eeeaff" transform="rotate(25)" />
          <rect x="-9" y="18" width="7" height="10" rx="3" fill="#eeeaff" />
          <rect x="2" y="18" width="7" height="10" rx="3" fill="#eeeaff" />
        </g>
      </g>

      <!-- Ракета время от времени пролетает дугой -->
      <g class="rocket-fly">
        <g>
          <path class="flame" d="M-22 0 Q-40 -6 -52 0 Q-40 6 -22 0 Z" fill="#f2ff94" />
          <path d="M-22 -9 L14 -9 Q30 -9 38 0 Q30 9 14 9 L-22 9 Z" fill="#ffd6f0" />
          <path d="M-22 -9 L-30 -18 L-12 -9 Z M-22 9 L-30 18 L-12 9 Z" fill="#8b6ff0" />
          <circle cx="12" cy="0" r="4.5" fill="#2f2560" stroke="#8b6ff0" stroke-width="2" />
        </g>
      </g>

      <!-- Луч НЛО -->
      <polygon class="beam" points="1010,206 1090,206 1120,366 980,366" fill="url(#sp-beam)" />

      <!-- Камушек, который луч затягивает в НЛО -->
      <g class="lift">
        <path d="M1040 362 l6 -8 l9 1 l4 7 l-5 6 l-10 0 Z" fill="#c6e86a" />
      </g>

      <!-- НЛО с инопланетянином -->
      <g class="bob ufo">
        <ellipse cx="1050" cy="178" rx="28" ry="22" fill="#cfe9ff" fill-opacity="0.35" />
        <circle cx="1050" cy="178" r="9" fill="#9be05a" />
        <circle cx="1046" cy="176" r="2.2" fill="#1e1a33" />
        <circle cx="1054" cy="176" r="2.2" fill="#1e1a33" />
        <ellipse cx="1050" cy="198" rx="62" ry="14" fill="#8b6ff0" />
        <ellipse cx="1050" cy="194" rx="62" ry="6" fill="#a993ff" />
        <circle cx="1014" cy="200" r="3" fill="#f2ff94" class="blink" />
        <circle cx="1050" cy="204" r="3" fill="#f2ff94" class="blink d2" />
        <circle cx="1086" cy="200" r="3" fill="#f2ff94" class="blink d3" />
      </g>

      <!-- Планета-горизонт -->
      <path d="M-40 480 L-40 404 Q720 330 1480 404 L1480 480 Z" fill="url(#sp-ground)" />
      <path d="M-40 404 Q720 330 1480 404" fill="none" stroke="#f2ff94" stroke-opacity="0.35" stroke-width="2" />
      <ellipse cx="380" cy="420" rx="34" ry="7" fill="#1e1a33" fill-opacity="0.45" />
      <ellipse cx="820" cy="400" rx="22" ry="5" fill="#1e1a33" fill-opacity="0.45" />
      <ellipse cx="1160" cy="430" rx="40" ry="8" fill="#1e1a33" fill-opacity="0.4" />

      <!-- Динозавр гуляет туда-обратно -->
      <g class="dino-walk">
        <g class="dino">
          <!-- хвост, тело, шея, голова -->
          <path d="M0 -26 Q-30 -30 -46 -14 Q-28 -20 -4 -14 Z" fill="#c6e86a" />
          <ellipse cx="10" cy="-22" rx="24" ry="14" fill="#c6e86a" />
          <path d="M24 -30 Q34 -52 40 -58 L50 -56 Q44 -40 34 -20 Z" fill="#c6e86a" />
          <ellipse cx="48" cy="-60" rx="11" ry="7" fill="#c6e86a" />
          <circle cx="51" cy="-62" r="1.8" fill="#1e1a33" />
          <!-- гребень -->
          <path d="M-6 -34 l4 -6 l4 6 l4 -7 l4 7 l4 -6 l4 6" fill="none" stroke="#9fc24a" stroke-width="2.5" stroke-linejoin="round" />
          <!-- лапы -->
          <rect class="leg l1" x="0" y="-12" width="6" height="14" rx="3" fill="#a9cc52" />
          <rect class="leg l2" x="16" y="-12" width="6" height="14" rx="3" fill="#a9cc52" />
        </g>
      </g>

      <!-- Инопланетяне: один машет, у обоих мигают антенны -->
      <g transform="translate(1110 384)">
        <g class="alien">
          <ellipse cx="0" cy="-12" rx="9" ry="12" fill="#8fe06a" />
          <circle cx="0" cy="-30" r="11" fill="#8fe06a" />
          <ellipse cx="-4" cy="-31" rx="3" ry="4" fill="#1e1a33" />
          <ellipse cx="4" cy="-31" rx="3" ry="4" fill="#1e1a33" />
          <line x1="0" y1="-41" x2="0" y2="-50" stroke="#8fe06a" stroke-width="2" />
          <circle cx="0" cy="-52" r="3" fill="#f2ff94" class="blink" />
          <line class="wave" x1="8" y1="-16" x2="20" y2="-28" stroke="#8fe06a" stroke-width="4" stroke-linecap="round" />
          <line x1="-8" y1="-16" x2="-15" y2="-6" stroke="#8fe06a" stroke-width="4" stroke-linecap="round" />
        </g>
      </g>
      <g transform="translate(1155 388) scale(0.8)">
        <g class="alien hop">
          <ellipse cx="0" cy="-12" rx="9" ry="12" fill="#6fd0c0" />
          <circle cx="0" cy="-30" r="11" fill="#6fd0c0" />
          <circle cx="0" cy="-31" r="4.5" fill="#1e1a33" />
          <circle cx="1.5" cy="-32.5" r="1.4" fill="#fff" />
          <line x1="0" y1="-41" x2="0" y2="-50" stroke="#6fd0c0" stroke-width="2" />
          <circle cx="0" cy="-52" r="3" fill="#ffd6f0" class="blink d2" />
        </g>
      </g>
    </svg>
  </section>
</template>

<style scoped>
.space {
  position: relative;
  overflow: hidden;
  height: max(60vh, 420px);
  margin-top: 8px;
}
.space-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.space-svg * {
  transform-box: fill-box;
  transform-origin: center;
}

.bob {
  animation: sp-bob 5s ease-in-out infinite alternate;
}
.bob.slow {
  animation-duration: 8s;
}
.ufo {
  animation-duration: 3s;
}
@keyframes sp-bob {
  to {
    translate: 0 -10px;
  }
}
.drift {
  animation: sp-drift 14s ease-in-out infinite alternate;
}
@keyframes sp-drift {
  to {
    translate: -30px 8px;
  }
}
.twinkle {
  animation: sp-twinkle 3s ease-in-out infinite alternate;
}
.blink {
  animation: sp-twinkle 1.2s ease-in-out infinite alternate;
}
.d2 {
  animation-delay: 0.6s;
}
.d3 {
  animation-delay: 1.1s;
}
@keyframes sp-twinkle {
  from {
    opacity: 0.25;
  }
}
.beam {
  animation: sp-beam 4s ease-in-out infinite;
}
@keyframes sp-beam {
  0%,
  35%,
  100% {
    opacity: 0;
  }
  50%,
  80% {
    opacity: 1;
  }
}

/* Динозавр: идёт вправо, разворачивается, идёт влево */
.dino-walk {
  animation: sp-walk 22s linear infinite;
}
@keyframes sp-walk {
  0% {
    transform: translate(470px, 372px) scaleX(1);
  }
  48% {
    transform: translate(940px, 372px) scaleX(1);
  }
  50% {
    transform: translate(940px, 372px) scaleX(-1);
  }
  98% {
    transform: translate(470px, 372px) scaleX(-1);
  }
  100% {
    transform: translate(470px, 372px) scaleX(1);
  }
}
.dino-walk,
.dino-walk * {
  transform-box: view-box;
  transform-origin: 0 0;
}
.dino {
  animation: sp-step 0.5s ease-in-out infinite alternate;
}
@keyframes sp-step {
  to {
    translate: 0 -2px;
  }
}
.leg {
  transform-box: fill-box !important;
  transform-origin: 50% 0 !important;
  animation: sp-leg 0.5s ease-in-out infinite alternate;
}
.leg.l2 {
  animation-direction: alternate-reverse;
}
@keyframes sp-leg {
  from {
    rotate: -25deg;
  }
  to {
    rotate: 25deg;
  }
}

.wave {
  transform-box: fill-box;
  transform-origin: 0 100%;
  animation: sp-wave 0.6s ease-in-out infinite alternate;
}
@keyframes sp-wave {
  from {
    rotate: -25deg;
  }
  to {
    rotate: 20deg;
  }
}
.hop {
  animation: sp-hop 1.6s ease-in-out infinite;
}
@keyframes sp-hop {
  0%,
  60%,
  100% {
    translate: 0 0;
  }
  75% {
    translate: 0 -12px;
  }
}

/* Космонавт: дрейфует и медленно кувыркается */
.astro-float {
  transform-box: view-box;
  transform-origin: 0 0;
  translate: 480px 190px;
  animation: sp-astro 16s ease-in-out infinite alternate;
}
@keyframes sp-astro {
  to {
    translate: 560px 150px;
  }
}
.astro {
  animation: sp-spin 24s linear infinite;
}
@keyframes sp-spin {
  to {
    rotate: 360deg;
  }
}

/* Ракета: пролетает дугой примерно раз в 14 секунд */
.rocket-fly,
.rocket-fly * {
  transform-box: view-box;
  transform-origin: 0 0;
}
.rocket-fly {
  animation: sp-rocket 14s ease-in-out infinite;
}
@keyframes sp-rocket {
  0% {
    transform: translate(-120px, 330px) rotate(-28deg);
  }
  10% {
    transform: translate(380px, 170px) rotate(-14deg);
  }
  20% {
    transform: translate(860px, 130px) rotate(6deg);
  }
  32% {
    transform: translate(1580px, 250px) rotate(22deg);
  }
  100% {
    transform: translate(1580px, 250px) rotate(22deg);
  }
}
.flame {
  transform-box: fill-box !important;
  transform-origin: 100% 50% !important;
  animation: sp-flame 0.15s ease-in-out infinite alternate;
}
@keyframes sp-flame {
  to {
    scale: 1.35 0.8;
  }
}

/* Камушек поднимается в луче, пока луч горит (тот же цикл, что у .beam) */
.lift {
  animation: sp-lift 4s ease-in infinite;
}
@keyframes sp-lift {
  0%,
  40% {
    translate: 0 0;
    opacity: 1;
    scale: 1;
  }
  80% {
    translate: 0 -150px;
    opacity: 0;
    scale: 0.5;
  }
  81%,
  95% {
    translate: 0 0;
    opacity: 0;
    scale: 1;
  }
  100% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .space-svg * {
    animation: none !important;
  }
  .dino-walk {
    transform: translate(700px, 372px);
  }
}
</style>
