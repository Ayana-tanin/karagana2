# Быстрый старт Terra Care

## 1. Установка (один раз)

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
```

## 2. Копирование изображений

Скопируйте изображения в `static/images/`:
- main_page.jpg
- soap2.JPG, soap3.JPG, soap4.PNG
- IMG_8132.PNG, IMG_8135.PNG, IMG_8136.PNG, IMG_8139.PNG
- WhatsApp Image 2025-12-27 at 20.03.26.jpeg

## 3. Настройка Telegram (опционально)

В `terracare/settings.py` измените:
```python
TELEGRAM_BOT_TOKEN = 'ваш_токен'
TELEGRAM_CHAT_ID = 'ваш_chat_id'
```

## 4. Запуск

```bash
python manage.py runserver
```

Или используйте `run.bat` на Windows.

## 5. Добавление товаров

1. Откройте http://127.0.0.1:8000/admin/
2. Войдите с учетными данными суперпользователя
3. Добавьте товары в разделе "Shop" > "Products"
4. Для каждого товара загрузите несколько изображений

## Готово!

Сайт доступен по адресу: http://127.0.0.1:8000/
