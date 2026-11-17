# Структура проекта Terra Care

```
КАРАГАНА/
│
├── manage.py                    # Django управляющий скрипт
├── requirements.txt             # Зависимости Python
├── db.sqlite3                   # База данных (создается после migrate)
│
├── terracare/                   # Главный проект Django
│   ├── __init__.py
│   ├── settings.py              # Настройки проекта
│   ├── urls.py                  # Главные URL маршруты
│   └── wsgi.py                  # WSGI конфигурация
│
├── shop/                        # Приложение магазина
│   ├── __init__.py
│   ├── models.py                # Модели: Product, ProductImage, Order, OrderItem
│   ├── admin.py                 # Админ панель
│   ├── views.py                 # Представления (views)
│   ├── urls.py                  # URL маршруты приложения
│   └── apps.py                  # Конфигурация приложения
│
├── templates/                   # HTML шаблоны
│   ├── base.html                # Базовый шаблон
│   └── shop/
│       └── index.html           # Главная страница
│
├── static/                      # Статические файлы
│   ├── css/
│   │   └── styles.css           # Стили (темно-зеленый дизайн)
│   ├── js/
│   │   └── app.js               # JavaScript (корзина, заказы)
│   └── images/                  # Изображения товаров
│
├── media/                       # Загружаемые файлы (создается автоматически)
│   └── products/                # Изображения товаров из админки
│
├── locale/                      # Файлы переводов (для i18n)
│
└── Старые файлы (можно удалить):
    ├── index.html               # Старый HTML
    ├── styles.css              # Старый CSS
    ├── app.js                  # Старый JS
    ├── products.js             # Старый products.js
    └── translations.js         # Старый translations.js
```

## Распределение по файлам

### 1. Модели данных (`shop/models.py`)
- **Product** - товары с названиями на 3 языках
- **ProductImage** - изображения товаров (несколько на товар)
- **Order** - заказы
- **OrderItem** - позиции заказа

### 2. Админ панель (`shop/admin.py`)
- Управление товарами
- Управление заказами
- Загрузка изображений

### 3. Представления (`shop/views.py`)
- `index()` - главная страница
- `get_products_json()` - API для получения товаров
- `create_order()` - создание заказа
- `send_order_to_telegram()` - отправка в Telegram

### 4. URL маршруты
- `terracare/urls.py` - главные маршруты
- `shop/urls.py` - маршруты приложения

### 5. Шаблоны
- `templates/base.html` - базовый шаблон с навигацией
- `templates/shop/index.html` - главная страница

### 6. Статические файлы
- `static/css/styles.css` - стили
- `static/js/app.js` - JavaScript логика
- `static/images/` - изображения

## Команды управления

```bash
# Создать миграции
python manage.py makemigrations

# Применить миграции
python manage.py migrate

# Создать суперпользователя
python manage.py createsuperuser

# Запустить сервер
python manage.py runserver

# Собрать статические файлы (для production)
python manage.py collectstatic
```
