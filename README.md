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
│   ├── Layout.vue           # шапка + контент, фон, человечек у курсора
│   ├── SiteHeader.vue       # липкая шапка: имя, навигация по центру, тогл человечка
│   ├── RunnerToggle.vue     # тогл «с человечком / без»
│   ├── CursorFx.vue         # человечек у курсора: бегает, меняет цвет, говорит фразы
│   ├── Starfield.vue        # мерцающие звёздочки на фоне
│   ├── Comets.vue           # кометы: разбиваются о блоки и о человечка
│   ├── SpaceScene.vue       # космос в самом низу главной: планеты, динозавр, НЛО, ракета
│   ├── HeroSection.vue      # первый блок, меняющееся слово в заголовке
│   ├── ConceptsSection.vue  # блок проектов
│   ├── projects/
│   │   ├── ProjectsStack.vue  # проекты стопкой при прокрутке
│   │   └── ProjectCover.vue   # обложка проекта в одинаковой рамке
│   ├── ConceptStage.vue     # экраны на странице концепта
│   ├── ConceptCover.vue     # картинка с видео поверх экранов
│   ├── AboutSection.vue     # «Обо мне»: результаты, опыт, образование
│   ├── ContactSection.vue   # финальный блок с кнопкой в Телеграм
│   ├── SectionTitle.vue     # заголовок секции
│   ├── Pill.vue             # кнопка-«пилюля»
│   └── cases/mindset/       # страница Mindset: разделы (board.css) и экраны приложения кодом
├── composables/             # активный пункт навигации, состояние человечка
├── data/
│   ├── profile.ts           # имя, почта, ссылки, пункты навигации
│   ├── concepts.ts          # проекты: обложки, описания, экраны
│   └── experience.ts        # «Обо мне»: ключевые результаты, опыт, навыки, образование
├── directives/typograph.ts  # неразрывные пробелы: предлоги, тире, числа
├── views/                   # HomeView, ConceptView (/concepts/:slug), MindsetView (/projects/mindset)
└── styles/tailwind.css      # цвета, стекло, шрифт
```

## Цвета

Заданы в `src/styles/tailwind.css`, тема — тёмные «Сумерки»:

| Токен | Цвет | Где |
|---|---|---|
| `surface` | `#1E1A33` | фон страницы |
| `fg` | `#ECE9F8` | основной светлый текст |
| `accent` | `#F2FF94` | лаймовый: кнопки, цифры, акценты |
| `ink` | `#1F1D2B` | тёмный текст на лаймовом и белом |
| `--glass-*` | фиолетовое стекло | шапка и все фиолетовые блоки |

## Наполнение

- **Проекты** — `src/data/concepts.ts`. Картинки — в `public/images/concepts`, видео — в `public/videos`. У пяти проектов пока нет обложек (стоят заглушки).
- **Опыт и результаты** — `src/data/experience.ts`.
- **Ссылки и почта** — `src/data/profile.ts` (ссылка на hh пока заглушка).
- **Фразы человечка** — `src/components/CursorFx.vue`, список `PHRASES`.
- **CV** — замените `public/cv.pdf`.
- **Mindset** — на странице пока есть временный переключатель вариантов вёрстки (левый нижний угол).
