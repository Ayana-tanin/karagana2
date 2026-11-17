# Инструкция по настройке Terra Care Django сайта

## Шаг 1: Установка зависимостей

```bash
pip install -r requirements.txt
```

## Шаг 2: Настройка базы данных

```bash
python manage.py makemigrations
python manage.py migrate
```

## Шаг 3: Создание суперпользователя

```bash
python manage.py createsuperuser
```

Введите:
- Username: admin (или свой)
- Email: ваш email
- Password: ваш пароль

## Шаг 4: Копирование изображений

Скопируйте следующие изображения в папку `static/images/`:
- main_page.jpg
- soap2.JPG
- soap3.JPG
- soap4.PNG
- IMG_8132.PNG
- IMG_8135.PNG
- IMG_8136.PNG
- IMG_8139.PNG
- WhatsApp Image 2025-12-27 at 20.03.26.jpeg

## Шаг 5: Настройка Telegram Bot

1. Создайте бота через @BotFather в Telegram
2. Получите Bot Token
3. Получите Chat ID (можно через @userinfobot)
4. Откройте файл `terracare/settings.py` и измените:
   ```python
   TELEGRAM_BOT_TOKEN = 'ваш_токен_здесь'
   TELEGRAM_CHAT_ID = 'ваш_chat_id_здесь'
   ```

Или создайте файл `.env` (скопируйте из `.env.example`) и задайте переменные:
```bash
TELEGRAM_BOT_TOKEN=ваш_токен
TELEGRAM_CHAT_ID=ваш_chat_id
```
На Windows в PowerShell перед запуском:
```powershell
$env:TELEGRAM_BOT_TOKEN="ваш_токен"
$env:TELEGRAM_CHAT_ID="ваш_chat_id"
```

**Заявка на карагану** отправляется в тот же чат. В комментарии к заявке пользователь указывает: объём (кг), район/адрес сбора, желаемые сроки.

## Шаг 6: Запуск сервера

```bash
python manage.py runserver
```

Откройте в браузере:
- Сайт: http://127.0.0.1:8000/
- Админ панель: http://127.0.0.1:8000/admin/

## Шаг 7: Добавление товаров через админ панель

1. Войдите в админ панель
2. Перейдите в раздел "Shop" > "Products"
3. Нажмите "Add Product"
4. Заполните:
   - Названия на 3 языках (ky, ru, en)
   - Описания на 3 языках
   - Цену
   - Статус наличия
5. Сохраните
6. Добавьте изображения: нажмите "Add another Product Image" и загрузите файлы

## Особенности дизайна

- Темно-зеленые цвета (#0d2818, #1a4d2e, #2d5a3d)
- Большие заголовки (font-weight: 900, uppercase)
- Современный минималистичный дизайн
- Адаптивная верстка

## Мультиязычность

Сайт поддерживает 3 языка:
- Кыргызский (ky)
- Русский (ru) - по умолчанию
- Английский (en)

Переключение языков происходит через кнопки в навигации.
