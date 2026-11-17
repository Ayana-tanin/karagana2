# Деплой Terra Care (production)

## Что нужно перед деплоем

1. **Переменные окружения** (в `.env` или в настройках хоста):

| Переменная | Обязательно | Описание |
|------------|-------------|----------|
| `DJANGO_SECRET_KEY` | Да (на проде) | Длинная случайная строка для подписи сессий. Сгенерировать: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"` |
| `ALLOWED_HOSTS` | Да (на проде) | Через запятую: домен и IP сервера, например `yourdomain.com,www.yourdomain.com,1.2.3.4` |
| `DJANGO_DEBUG` | Нет | На проде должно быть `0` (уже в compose) |
| `TELEGRAM_BOT_TOKEN` | Нет | Токен бота для заказов |
| `TELEGRAM_CHAT_ID` | Нет | Chat ID для уведомлений |

2. На **Railway** порт задаёт сама площадка (**8080**), домен вида `https://karagana-production.up.railway.app` — свой подставляйте.

---

## Деплой на Railway (порт 8080, домен от площадки)

Площадка сама даёт URL (например `https://karagana-production.up.railway.app`) и порт **8080**. Свой домен подключать не обязательно.

1. В Railway: **New Project** → **Deploy from GitHub** (или загрузка кода), выберите репозиторий с проектом.
2. В настройках сервиса укажите **Dockerfile path**: `Dockerfile.prod` (чтобы собирался production-образ).
3. В **Variables** добавьте переменные:

| Переменная | Значение |
|------------|----------|
| `PORT` | `8080` (часто Railway подставляет сам) |
| `DJANGO_SECRET_KEY` | Длинная случайная строка (сгенерировать командой из таблицы выше) |
| `ALLOWED_HOSTS` | `*` или `karagana-production.up.railway.app,.up.railway.app` |
| `CSRF_TRUSTED_ORIGINS` | `https://karagana-production.up.railway.app` (ваш URL с https) |
| `DJANGO_DEBUG` | `0` |
| `TELEGRAM_BOT_TOKEN` | ваш токен (если нужны заказы в Telegram) |
| `TELEGRAM_CHAT_ID` | ваш chat id |

4. Сохраните и дождитесь пересборки. Сайт откроется по ссылке вида `https://karagana-production.up.railway.app/`.

5. Суперпользователь для админки: в Railway откройте **Shell** (или запуск команды) и выполните:
   ```bash
   python manage.py createsuperuser
   ```

---

## Запуск на своём сервере (VPS, облако)

### 1. Склонировать/загрузить проект на сервер

```bash
# например
git clone <ваш-репозиторий> karagana && cd karagana
```

### 2. Создать файл `.env` в корне проекта

```bash
nano .env
```

Пример содержимого:

```env
DJANGO_SECRET_KEY=ваша-длинная-случайная-строка
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com,IP_СЕРВЕРА
CSRF_TRUSTED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
TELEGRAM_BOT_TOKEN=токен
TELEGRAM_CHAT_ID=chat_id
```

### 3. Собрать и запустить в фоне

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

Сайт будет доступен по адресу сервера на порту 8000, например: `http://IP_СЕРВЕРА:8000`.

### 4. Создать суперпользователя (админка)

```bash
docker-compose -f docker-compose.prod.yml exec web python manage.py createsuperuser
```

### 5. Остановка / перезапуск

```bash
# Остановить
docker-compose -f docker-compose.prod.yml down

# Запустить снова
docker-compose -f docker-compose.prod.yml up -d

# Пересобрать после изменений кода
docker-compose -f docker-compose.prod.yml up -d --build
```

---

## Раздача через Nginx (опционально)

Чтобы открывать сайт по 80 порту и по домену без `:8000`, настройте Nginx на хосте как обратный прокси:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    location /static/ {
        alias /путь/к/проекту/staticfiles/;
    }
    location /media/ {
        alias /путь/к/проекту/media/;
    }
}
```

Либо в `docker-compose.prod.yml` поменяйте порты на `"80:8000"` и заходите по `http://IP`.

---

## Отличия от dev-запуска

| | Разработка | Деплой (prod) |
|---|------------|----------------|
| Команда | `docker-compose up --build` | `docker-compose -f docker-compose.prod.yml up -d --build` |
| Файлы | `Dockerfile`, `docker-compose.yml` | `Dockerfile.prod`, `docker-compose.prod.yml` |
| Сервер | `runserver` | **gunicorn** (workers) |
| Статика | Django | **WhiteNoise** |
| DEBUG | True | 0 (через env) |
| SECRET_KEY / ALLOWED_HOSTS | дефолты | из `.env` |
