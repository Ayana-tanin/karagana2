# Команды для управления Django проектом

## Первоначальная настройка

```bash
# 1. Установить зависимости
pip install -r requirements.txt

# 2. Создать миграции
python manage.py makemigrations shop

# 3. Применить миграции (создать БД)
python manage.py migrate

# 4. Создать администратора
python manage.py createsuperuser
# Введите: username, email, password
```

## Ежедневная работа

```bash
# Запустить сервер разработки
python manage.py runserver
# Или с портом
python manage.py runserver 8000

# Остановить: Ctrl+C
```

## Управление данными

```bash
# Создать миграции после изменения models.py
python manage.py makemigrations

# Применить миграции
python manage.py migrate

# Откатить последнюю миграцию
python manage.py migrate shop 0001

# Показать SQL миграции
python manage.py sqlmigrate shop 0001
```

## Админ панель

1. Запустите сервер: `python manage.py runserver`
2. Откройте: http://127.0.0.1:8000/admin/
3. Войдите с учетными данными суперпользователя
4. Управляйте товарами и заказами

## Работа с товарами

В админ панели:
- **Shop > Products** - добавить/редактировать товары
- Для каждого товара можно загрузить несколько изображений
- Заполните названия и описания на 3 языках (ky, ru, en)

## Работа с заказами

В админ панели:
- **Shop > Orders** - просмотр всех заказов
- Статусы: New, Processing, Completed, Cancelled
- Заказы автоматически отправляются в Telegram (если настроено)

## Отладка

```bash
# Запустить shell Django
python manage.py shell

# В shell можно работать с моделями:
from shop.models import Product, Order
products = Product.objects.all()
orders = Order.objects.filter(status='new')
```

## Production (для деплоя)

```bash
# Собрать статические файлы
python manage.py collectstatic

# Изменить DEBUG = False в settings.py
# Настроить ALLOWED_HOSTS
# Настроить базу данных (PostgreSQL)
```
