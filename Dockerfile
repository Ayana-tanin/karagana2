# Terra Care — запуск через Docker
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Зависимости системы (для Pillow и т.д.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libjpeg-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

# Python-зависимости
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

# Код проекта
COPY . .

# Собираем статику (если есть)
RUN python manage.py collectstatic --noinput 2>/dev/null || true

# Порт
EXPOSE 8000

# Миграции + запуск (runserver для простого запуска; для продакшена можно заменить на gunicorn)
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py runserver 0.0.0.0:8000"]
