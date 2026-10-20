# Портфолио дизайнера

Сайт-портфолио на **Vue 3 + TypeScript + Vite + Tailwind CSS v4**.
Макет: [Figma](https://www.figma.com/design/dlgMdFSwL4R7X38motUeDw).

## Запуск

```bash
npm install
npm run dev      # дев-сервер (http://localhost:5173)
npm run build    # типизация + прод-сборка
npm run preview  # предпросмотр сборки
```

## Структура

```
src/
├── components/
│   ├── Layout.vue        # колонка 900px: шапка + контент
│   ├── SiteHeader.vue    # липкая шапка с навигацией по секциям
│   ├── HeroSection.vue   # первый блок
│   ├── ConceptsSection.vue  # блок «Проекты»: сетка на всю ширину (~1.6 : 1)
│   ├── ConceptCard.vue   # карточка концепта
│   ├── DotsBackground.vue  # фон из точек + курсор-круг (GSAP)
│   ├── vue-bits/DotGrid.vue  # сетка точек из Vue Bits (vue-bits.dev), с увеличением у курсора
│   ├── AboutSection.vue  # «Обо мне»: контакты и ключевые результаты
│   ├── SectionTitle.vue  # заголовок секции
│   └── Pill.vue          # кнопка-«пилюля» (ghost / accent / light)
├── composables/
│   └── useActiveSection.ts  # подсветка активного пункта навигации
├── data/
│   ├── profile.ts        # имя, почта, ссылки, пункты навигации
│   └── concepts.ts       # карточки проектов (обложка)
├── views/                # HomeView, ConceptView (/concepts/:slug), NotFoundView
└── styles/tailwind.css   # цвета и шрифт (@theme)
```

## Цвета

Заданы в `src/styles/tailwind.css` и доступны как классы `bg-brand`, `text-ink` и т.д.:

| Токен | Цвет | Где |
|---|---|---|
| `brand` | `#8B6FF0` | шапка, карточки |
| `accent` | `#F2FF94` | главное действие, активный пункт |
| `surface` | `#F5F5F5` | фон страницы |
| `ink` | `#1F1D2B` | тёмный текст |

## Наполнение

- **Проекты и концепты** — `src/data/concepts.ts`. `image` — обложка карточки (файл в `public/images/concepts`). Проекты пока моки.
- **Ссылки и почта** — `src/data/profile.ts` (Telegram и LinkedIn пока заглушки).
- **Новая секция** — добавьте компонент с `id` в `HomeView.vue` и пункт в `navSections`.
- **CV** — замените `public/cv.pdf`.
