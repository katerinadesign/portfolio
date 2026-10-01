import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const imagesDir = join(root, 'public', 'images')
mkdirSync(imagesDir, { recursive: true })

// Мягкие пастельные пары для градиентов заглушек
const palettes = {
  bloom: ['#eceef0', '#dcdfe3'],
  atlas: ['#f0f1f3', '#e0e3e7'],
  petal: ['#eef0f2', '#dde0e4'],
  calm: ['#edeef0', '#d6dadf'],
}

function svg(label, [c1, c2], w = 800, h = 600) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <circle cx="${w * 0.78}" cy="${h * 0.24}" r="${h * 0.16}" fill="#ffffff" opacity="0.35"/>
  <rect x="${w * 0.1}" y="${h * 0.62}" width="${w * 0.44}" height="18" rx="9" fill="#ffffff" opacity="0.5"/>
  <rect x="${w * 0.1}" y="${h * 0.7}" width="${w * 0.3}" height="14" rx="7" fill="#ffffff" opacity="0.4"/>
  <text x="${w * 0.1}" y="${h * 0.5}" font-family="Inter, system-ui, sans-serif" font-size="34" font-weight="600" fill="#7c8086">${label}</text>
</svg>`
}

const files = {
  'bloom-cover': ['Bloom Banking', 'bloom'],
  'bloom-01': ['Исследование', 'bloom'],
  'bloom-02': ['Дизайн-система', 'bloom'],
  'bloom-03': ['Результат', 'bloom'],
  'atlas-cover': ['Atlas CRM', 'atlas'],
  'atlas-01': ['Аудит', 'atlas'],
  'atlas-02': ['Дашборд', 'atlas'],
  'petal-cover': ['Petal Shop', 'petal'],
  'petal-01': ['Каталог', 'petal'],
  'petal-02': ['Оформление', 'petal'],
  'calm-cover': ['Calm Tracker', 'calm'],
  'calm-01': ['Концепция', 'calm'],
  'calm-02': ['Сценарий', 'calm'],
}

for (const [name, [label, key]] of Object.entries(files)) {
  writeFileSync(join(imagesDir, `${name}.svg`), svg(label, palettes[key]))
}

// Favicon
writeFileSync(
  join(root, 'public', 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#dcdfe3"/><text x="32" y="43" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="34" font-weight="600" fill="#45484d">К</text></svg>`,
)

console.log(`Готово: ${Object.keys(files).length} изображений + favicon`)
