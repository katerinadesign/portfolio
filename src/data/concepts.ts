export interface ConceptSection {
  title: string
  text: string
}

export interface Concept {
  slug: string
  title: string
  summary: string
  year: string
  platform: string
  /** Классы градиента-заглушки вместо обложки, пока нет макетов */
  cover: string
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
    slug: 'flower-delivery',
    title: 'Доставка цветов',
    summary: 'Мобильное приложение для заказа букетов',
    year: '2026',
    platform: 'iOS',
    cover: 'from-brand/40 to-accent',
    sections: mockSections,
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
