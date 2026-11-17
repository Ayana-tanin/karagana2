# Очистка проекта от старых файлов

## Старые файлы, которые можно удалить:

Эти файлы остались от статической версии сайта и больше не используются:

```
КАРАГАНА/
├── index.html          ❌ Удалить (используется templates/shop/index.html)
├── styles.css          ❌ Удалить (используется static/css/styles.css)
├── app.js              ❌ Удалить (используется static/js/app.js)
├── products.js          ❌ Удалить (данные теперь в БД)
├── translations.js     ❌ Удалить (используется Django i18n)
└── config.example.js   ❌ Удалить (настройки в terracare/settings.py)
```

## Как удалить:

### Windows (PowerShell):
```powershell
Remove-Item index.html
Remove-Item styles.css
Remove-Item app.js
Remove-Item products.js
Remove-Item translations.js
Remove-Item config.example.js
```

### Или вручную:
Просто удалите эти файлы через проводник.

## После удаления:

Проект будет использовать только Django файлы:
- ✅ `templates/shop/index.html` - шаблоны
- ✅ `static/css/styles.css` - стили
- ✅ `static/js/app.js` - JavaScript
- ✅ `shop/models.py` - данные товаров в БД
- ✅ Django i18n - мультиязычность

## Важно:

**НЕ удаляйте:**
- `manage.py` - нужен для Django
- `requirements.txt` - зависимости
- Папки `terracare/`, `shop/`, `templates/`, `static/`
- Изображения (IMG_*.PNG, soap*.JPG, main_page.jpg) - они нужны
