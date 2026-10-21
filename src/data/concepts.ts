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
}

export interface ConceptImage {
  src: string
  width: number
  height: number
  alt: string
  /** Видео поверх отдельных экранов на картинке */
  videos?: ConceptImageVideo[]
  /**
   * Как показывать в галерее страницы концепта: 'phone' — один экран по центру карточки
   * (по умолчанию), 'full' — картинка во всю ширину (например, несколько экранов)
   */
  layout?: 'phone' | 'full'
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
      src: 'images/concepts/peco-screens.jpg',
      width: 1992,
      height: 1379,
      alt: 'Три экрана приложения PECO: тест воздуха, статус фильтра и заказ фильтра',
      videos: [
        // Запись анимации среднего экрана. Положение — из Figma:
        // экран 390×844 с радиусом 48 в секции 1505×1044 (x 540, y 100);
        // картинка — секция в масштабе ×1.3289 с обрезкой 4px по краям
        {
          src: 'videos/peco-filter-status.mp4',
          left: 35.82,
          top: 9.35,
          width: 26.02,
          height: 81.33,
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
          },
        ],
      },
      {
        src: 'images/concepts/beyond-finance.webp',
        width: 2000,
        height: 1420,
        alt: 'Три экрана финансового приложения Beyond: приветствие, карты и история, перевод',
        layout: 'full',
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
