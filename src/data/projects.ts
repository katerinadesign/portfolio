import type { Project } from '@/types/project'

/**
 * Централизованное хранилище моковых проектов.
 * Реальные проекты добавляются сюда же — структура задаётся типом `Project`.
 * Изображения лежат в `public/images` (можно заменить на реальные ссылки).
 */
const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`

export const projects: Project[] = [
  {
    slug: 'bloom-banking',
    title: 'Bloom Banking',
    summary: 'Мобильный банк с бережным онбордингом и понятной аналитикой расходов.',
    cover: img('bloom-cover.svg'),
    coverAlt: 'Экраны мобильного банковского приложения Bloom',
    year: '2025',
    role: 'Product Designer',
    tags: [
      { id: 'mobile', label: 'Mobile' },
      { id: 'fintech', label: 'Fintech' },
      { id: 'b2c', label: 'B2C' },
    ],
    blocks: [
      {
        id: 'discovery',
        image: img('bloom-01.svg'),
        imageAlt: 'Карта пользовательских сценариев Bloom',
        title: 'Исследование',
        text: 'Начали с интервью и карты сценариев: пользователям было тяжело понимать, куда уходят деньги. Мы упростили навигацию до трёх ключевых разделов и убрали лишние состояния.',
        layout: 'side',
      },
      {
        id: 'system',
        image: img('bloom-02.svg'),
        imageAlt: 'UI-кит и компоненты дизайн-системы Bloom',
        title: 'Дизайн-система',
        text: 'Собрали лёгкую дизайн-систему в Figma: токены цвета, типографика и переиспользуемые компоненты. Это ускорило работу с разработкой и сохранило единый визуальный язык.',
        layout: 'side',
      },
      {
        id: 'result',
        image: img('bloom-03.svg'),
        imageAlt: 'Финальные экраны аналитики расходов Bloom',
        title: 'Результат',
        text: 'Аналитика расходов стала нагляднее за счёт мягких категорийных цветов и спокойных графиков. После редизайна доля пользователей, открывающих раздел аналитики, выросла.',
        layout: 'below',
      },
    ],
  },
  {
    slug: 'atlas-crm',
    title: 'Atlas CRM',
    summary: 'B2B-платформа для отделов продаж: воронки, задачи и командная аналитика.',
    cover: img('atlas-cover.svg'),
    coverAlt: 'Дашборд B2B CRM-системы Atlas',
    year: '2024',
    role: 'UX/UI Designer',
    tags: [
      { id: 'web', label: 'Web' },
      { id: 'saas', label: 'SaaS' },
      { id: 'b2b', label: 'B2B' },
    ],
    blocks: [
      {
        id: 'audit',
        image: img('atlas-01.svg'),
        imageAlt: 'Аудит существующих интерфейсов Atlas',
        title: 'Аудит',
        text: 'Провели аудит текущего продукта и нашли перегруженные таблицы и непоследовательные состояния. Приоритизировали задачи вместе с командой и заказчиком.',
        layout: 'side',
      },
      {
        id: 'dashboard',
        image: img('atlas-02.svg'),
        imageAlt: 'Новый дашборд с воронками продаж',
        title: 'Дашборд',
        text: 'Спроектировали спокойный дашборд с акцентом на ключевые метрики. Плотность данных сохранили, но добавили воздух и понятную иерархию.',
        layout: 'below',
      },
    ],
  },
  {
    slug: 'petal-shop',
    title: 'Petal Shop',
    summary: 'Онлайн-магазин цветов с нежной подачей товара и быстрым оформлением заказа.',
    cover: img('petal-cover.svg'),
    coverAlt: 'Каталог онлайн-магазина цветов Petal',
    year: '2025',
    role: 'Product Designer',
    tags: [
      { id: 'ecommerce', label: 'E-commerce' },
      { id: 'adaptive', label: 'Adaptive' },
      { id: 'b2c', label: 'B2C' },
    ],
    blocks: [
      {
        id: 'catalog',
        image: img('petal-01.svg'),
        imageAlt: 'Адаптивный каталог магазина цветов',
        title: 'Каталог',
        text: 'Каталог построен на адаптивной сетке: от четырёх колонок на десктопе до одной на мобильном. Крупные фотографии и мягкие карточки делают акцент на товаре.',
        layout: 'side',
      },
      {
        id: 'checkout',
        image: img('petal-02.svg'),
        imageAlt: 'Экран оформления заказа Petal',
        title: 'Оформление заказа',
        text: 'Сократили оформление заказа до одного экрана с понятными шагами. Убрали визуальный шум и оставили только необходимое.',
        layout: 'below',
      },
    ],
  },
  {
    slug: 'calm-tracker',
    title: 'Calm Tracker',
    summary: 'Трекер привычек и настроения с тёплой визуализацией прогресса.',
    cover: img('calm-cover.svg'),
    coverAlt: 'Экраны приложения-трекера привычек Calm',
    year: '2024',
    role: 'UX/UI Designer',
    tags: [
      { id: 'mobile', label: 'Mobile' },
      { id: 'wellness', label: 'Wellness' },
      { id: 'b2c', label: 'B2C' },
    ],
    blocks: [
      {
        id: 'concept',
        image: img('calm-01.svg'),
        imageAlt: 'Концепт визуализации привычек Calm',
        title: 'Концепция',
        text: 'Хотелось уйти от давящих «стриков» и чувства вины. Прогресс показывается мягко — через цветение и пастельные состояния, а не через красные предупреждения.',
        layout: 'side',
      },
      {
        id: 'flow',
        image: img('calm-02.svg'),
        imageAlt: 'Пользовательский флоу отметки привычки',
        title: 'Сценарий',
        text: 'Отметить привычку можно в один тап. Микровзаимодействия дают приятную обратную связь и поддерживают спокойный тон продукта.',
        layout: 'below',
      },
    ],
  },
]

/** Быстрый поиск проекта по slug. */
export function findProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
