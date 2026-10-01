/**
 * Тип одного тега проекта.
 */
export interface ProjectTag {
  id: string
  label: string
}

/**
 * Блок контента внутри страницы проекта:
 * изображение + сопровождающий текст.
 * Расположение текста управляется полем `layout`.
 */
export interface ProjectBlock {
  id: string
  image: string
  imageAlt: string
  title?: string
  text: string
  /** `side` — текст рядом с изображением, `below` — под ним. */
  layout: 'side' | 'below'
}

/**
 * Полная модель проекта портфолио.
 */
export interface Project {
  /** Уникальный идентификатор для маршрута `/projects/:slug`. */
  slug: string
  title: string
  /** Короткое описание для карточки и шапки страницы проекта. */
  summary: string
  /** Обложка проекта, отображается в карточке. */
  cover: string
  coverAlt: string
  /** Год реализации — выводится в шапке проекта. */
  year: string
  /** Роль дизайнера в проекте. */
  role: string
  tags: ProjectTag[]
  /** Контентные блоки страницы проекта. */
  blocks: ProjectBlock[]
}
