# Запуск Terra Care через Docker

## Что нужно

- Установленный [Docker](https://docs.docker.com/get-docker/) и Docker Compose.
- Файл `.env` в корне проекта (скопируйте из `.env.example`) с переменными:
  - `TELEGRAM_BOT_TOKEN`
  - `TELEGRAM_CHAT_ID`

## Запуск

```bash
docker-compose up --build
```

Первый запуск может занять 1–2 минуты (сборка образа и миграции).

- Сайт: **http://localhost:8000/**
- Админка: **http://localhost:8000/admin/**

Остановка: `Ctrl+C` в терминале или в другом окне:

```bash
docker-compose down
```

## Повторный запуск

```bash
docker-compose up
```

Без `--build` образ не пересобирается.

## Создание суперпользователя (админка)

```bash
docker-compose exec web python manage.py createsuperuser
```

Введите логин, email и пароль — ими можно входить в `/admin/`.

## Переменные окружения

Задаются в файле `.env` в корне проекта (см. `.env.example` и `ЧТО_ВВОДИТЬ.md`).  
При изменении `.env` перезапустите контейнеры:

```bash
docker-compose down
docker-compose up -d
```

## Данные

- **БД (SQLite):** создаётся в контейнере при первом запуске. После `docker-compose down` данные в БД сохраняются до пересоздания контейнера (`docker-compose up --force-recreate` или пересборка образа).
- **Медиа:** папка `./media` на хосте примонтирована в контейнер — загруженные файлы сохраняются между перезапусками.
