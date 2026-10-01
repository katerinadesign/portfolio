# Портфолио дизайнера

Минималистичный сайт-портфолио на **Vue 3 + TypeScript + Vite**.
Пастельная палитра, адаптивная вёрстка, фиксированное меню слева на десктопе.

## Технологии

- Vue 3 (Composition API, `<script setup>`)
- Vue Router — маршрут `/` и `/projects/:slug`
- Pinia — централизованное хранилище проектов
- TypeScript — типы `Project`, `ProjectTag`, `ProjectBlock`
- SCSS с общими дизайн-токенами (`src/styles/_variables.scss`)

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
│   ├── Layout.vue         # раскладка: fixed-меню + контент
│   ├── SidebarMenu.vue    # меню (обо мне, теги, Telegram, CV)
│   ├── ProjectGrid.vue    # адаптивная сетка карточек
│   ├── ProjectCard.vue    # карточка проекта
│   ├── ProjectDetail.vue  # страница проекта
│   └── Tag.vue            # пастельный тег-«пилюля»
├── views/
│   ├── HomeView.vue       # главная со списком проектов
│   ├── ProjectView.vue    # /projects/:slug
│   └── NotFoundView.vue   # «Проект не найден»
├── data/projects.ts       # моковые проекты
├── stores/projects.ts     # Pinia store
├── types/project.ts       # TypeScript-типы
└── styles/                # токены и глобальные стили
```

## Наполнение реальными данными

- **Проекты** — редактируйте `src/data/projects.ts` по структуре типа `Project`.
- **Изображения** — кладите в `public/images` и указывайте путь в проекте
  (заглушки сгенерированы скриптом `scripts/gen-placeholders.mjs`).
- **CV** — замените `public/cv.pdf` на настоящее резюме.
- **Telegram** — обновите ссылку в `src/components/SidebarMenu.vue`.
```
# katya
