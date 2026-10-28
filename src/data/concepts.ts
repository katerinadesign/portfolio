import type { RouteLocationRaw } from 'vue-router'

export interface ConceptSection {
  title: string
  text: string
}

/** Видео поверх части картинки (например, экрана): положение и скругление — в процентах от картинки */
export interface ConceptImageVideo {
  src: string
  left: number
  top: number
  width: number
  height: number
  /** CSS border-radius, например «12.3% / 5.7%» */
  radius: string
  /**
   * Увеличение видео внутри рамки по ширине и высоте — чтобы спрятать тёмные края записи
   * (по умолчанию 1). Раздельно, чтобы не срезать лишнее сверху, где рамка тоньше
   */
  scale?: { x: number; y: number }
  /** Сдвиг видео внутри рамки, в % от его размера — если в записи экран сидит не по центру */
  shift?: { x: number; y: number }
}

export interface ConceptImage {
  src: string
  width: number
  height: number
  alt: string
  /** Видео поверх отдельных экранов на картинке */
  videos?: ConceptImageVideo[]
  /**
   * Область с экранами на картинке, в процентах (без белых полей вокруг). На странице
   * концепта она растягивается на всю высоту карточки. По умолчанию — вся картинка
   */
  content?: { x: number; y: number; w: number; h: number }
}

export interface Concept {
  slug: string
  title: string
  /** Подпись под заголовком; можно не указывать */
  summary?: string
  year: string
  platform: string
  /** Классы градиента-заглушки вместо обложки, пока нет макетов */
  cover: string
  /** Картинка-обложка (путь от public/): в карточке на главной и на странице концепта */
  image?: ConceptImage
  /** Дополнительные экраны на странице концепта (без подписей), идут сразу после обложки */
  gallery?: ConceptImage[]
  sections: ConceptSection[]
  /** Имя маршрута отдельной страницы кейса — вместо стандартной страницы концепта */
  route?: string
}

// TODO: моки — заменить реальными концептами, обложками и описаниями
const mockSections: ConceptSection[] = [
  { title: 'Задача', text: 'Здесь будет описание задачи и контекста концепта.' },
  { title: 'Решение', text: 'Здесь будут ключевые решения, сценарии и экраны.' },
  { title: 'Итог', text: 'Здесь будет вывод: что получилось и чему научилась.' },
]

export const concepts: Concept[] = [
  {
    slug: 'peco',
    title: 'Концепты',
    year: '2026', // TODO: уточнить год
    platform: 'iOS',
    cover: 'from-accent/60 to-white',
    image: {
      // Экспорт секции из Figma в 2x (3010×2088) без серой обводки 2px по краю
      src: 'images/concepts/peco-screens.jpg',
      width: 3006,
      height: 2084,
      alt: 'Три экрана приложения PECO: тест воздуха, статус фильтра и заказ фильтра',
      // от левого края первого телефона до правого края третьего, по высоте телефонов
      content: { x: 6.59, y: 9.5, w: 86.83, h: 81 },
      videos: [
        // Запись анимации среднего экрана. Положение — из Figma:
        // экран 390×844 с радиусом 48 в секции 1505×1044 (x 540, y 100);
        // картинка — секция в масштабе ×2 со сдвигом 2px (обрезана обводка)
        {
          src: 'videos/peco-filter-status.mp4',
          left: 35.86,
          top: 9.5,
          width: 25.95,
          height: 81,
          radius: '12.3% / 5.69%',
          // в записи тёмная рамка ~6px по бокам (0.9% ширины) и ~5px сверху/снизу (0.3% высоты)
          scale: { x: 1.025, y: 1.008 },
        },
      ],
    },
    gallery: [
      {
        src: 'images/concepts/heart-control.webp',
        width: 780,
        height: 1688,
        alt: 'Экран приложения для удалённого контроля сердца: пульс, интервал ударов и давление',
        // Запись анимации экрана — на всю картинку, углы как у экрана в Figma (48px при 390×844)
        videos: [
          {
            src: 'videos/heart-control.mp4',
            left: 0,
            top: 0,
            width: 100,
            height: 100,
            radius: '12.31% / 5.69%',
            // в записи экран на 4px выше и на 1px левее, чем на картинке (при 390×844)
            shift: { x: 0.26, y: 0.47 },
          },
        ],
      },
      {
        src: 'images/concepts/beyond-finance.webp',
        width: 2000,
        height: 1420,
        alt: 'Три экрана финансового приложения Beyond: приветствие, карты и история, перевод',
        // телефоны: x 81…1918, y 136…1283 из 2000×1420
        content: { x: 4.05, y: 9.58, w: 91.85, h: 80.85 },
        // Записи анимаций всех трёх экранов. Положение замерено по картинке:
        // телефоны 532×1148 в точках (81, 136), (734, 136) и (1387, 136), радиус углов ~65px
        // (48px из Figma в масштабе)
        videos: [
          {
            src: 'videos/beyond-intro.mp4',
            left: 4.05,
            top: 9.58,
            width: 26.6,
            height: 80.85,
            radius: '12.31% / 5.71%',
          },
          {
            src: 'videos/beyond-cards.mp4',
            left: 36.7,
            top: 9.58,
            width: 26.6,
            height: 80.85,
            radius: '12.31% / 5.71%',
          },
          {
            src: 'videos/beyond-transfer.mp4',
            left: 69.35,
            top: 9.58,
            width: 26.6,
            height: 80.85,
            radius: '12.31% / 5.71%',
          },
        ],
      },
      {
        // Главная сайта quari — экспорт фрейма 1440×1070 из Figma в 2x
        src: 'images/concepts/quari-site.jpg',
        width: 2880,
        height: 2140,
        alt: 'Главная страница сайта финансового сервиса quari',
      },
    ],
    // TODO: описание итога
    sections: mockSections.filter((section) => section.title === 'Итог'),
  },
  {
    slug: 'meditation',
    title: 'Медитации',
    summary: 'Приложение для ежедневных практик',
    year: '2026',
    platform: 'iOS, Android',
    cover: 'from-accent to-brand/30',
    sections: mockSections,
  },
  {
    // Отдельная страница кейса (views/MindsetView.vue), секции не нужны.
    // Третьим в списке — в сетке встаёт в широкую колонку под карточкой «Концепты»
    slug: 'mindset',
    title: 'Mindset',
    year: '2025', // TODO: уточнить год
    platform: 'iOS, Android',
    cover: 'from-brand/40 to-accent/70',
    image: {
      src: 'images/concepts/mindset-cover.webp',
      width: 2000,
      height: 1188,
      alt: 'Обложка проекта Mind Care: главный экран приложения с уведомлением о сессии',
    },
    sections: [],
    route: 'mindset',
  },
  {
    slug: 'fintech-dashboard',
    title: 'Финтех-дашборд',
    summary: 'Личный кабинет для управления финансами',
    year: '2025',
    platform: 'Web',
    cover: 'from-brand/20 to-brand/60',
    sections: mockSections,
  },
  {
    slug: 'habit-tracker',
    title: 'Трекер привычек',
    summary: 'Простой трекер с геймификацией',
    year: '2025',
    platform: 'iOS',
    cover: 'from-accent/70 to-white',
    sections: mockSections,
  },
  {
    slug: 'cinema',
    title: 'Онлайн-кинотеатр',
    summary: 'Редизайн каталога и карточки фильма',
    year: '2025',
    platform: 'Web, Smart TV',
    cover: 'from-brand/60 to-brand/20',
    sections: mockSections,
  },
  {
    slug: 'hotel-booking',
    title: 'Бронирование отелей',
    summary: 'Сценарий поиска и брони за 3 шага',
    year: '2024',
    platform: 'Web, iOS',
    cover: 'from-white to-accent',
    sections: mockSections,
  },
]

/** Ссылка на страницу проекта: отдельный кейс или стандартная страница концепта */
export function conceptLink(concept: Concept): RouteLocationRaw {
  return concept.route ? { name: concept.route } : { name: 'concept', params: { slug: concept.slug } }
}
