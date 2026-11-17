from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.utils.translation import get_language, activate
from django.conf import settings
import json
import requests
from .models import Product, Order, OrderItem


def index(request):
    """Main page"""
    products = Product.objects.filter(in_stock=True).prefetch_related('images')
    context = {
        'products': products,
    }
    return render(request, 'shop/index.html', context)


def get_products_json(request):
    """Get products as JSON for AJAX"""
    lang = get_language()[:2] or 'ru'
    products = Product.objects.filter(in_stock=True).prefetch_related('images')
    
    products_data = []
    for product in products:
        images = [img.image.url for img in product.images.all()]
        products_data.append({
            'id': product.id,
            'name': product.get_name(lang),
            'description': product.get_description(lang),
            'price': float(product.price),
            'images': images,
            'inStock': product.in_stock,
        })
    
    return JsonResponse({'products': products_data})


@csrf_exempt
@require_http_methods(["POST"])
def create_order(request):
    """Create order and send to Telegram"""
    try:
        data = json.loads(request.body)
        
        # Create order
        order = Order.objects.create(
            customer_name=data.get('name'),
            customer_phone=data.get('phone'),
            customer_address=data.get('address'),
            customer_comment=data.get('comment', ''),
            total=0,
        )
        
        total = 0
        items_data = data.get('items', [])
        
        for item_data in items_data:
            try:
                product = Product.objects.get(id=item_data['id'])
                quantity = int(item_data['quantity'])
                price = float(product.price)
                
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    product_name=product.get_name(get_language()[:2] or 'ru'),
                    quantity=quantity,
                    price=price,
                )
                total += price * quantity
            except Product.DoesNotExist:
                continue
        
        order.total = total
        order.save()
        
        # Send to Telegram
        success = send_order_to_telegram(order)
        if success:
            order.sent_to_telegram = True
            order.save()
        
        return JsonResponse({
            'success': True,
            'order_id': order.id,
            'telegram_sent': success
        })
    
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)


def send_order_to_telegram(order):
    """Send order to Telegram"""
    if (settings.TELEGRAM_BOT_TOKEN == 'YOUR_BOT_TOKEN_HERE' or 
        settings.TELEGRAM_CHAT_ID == 'YOUR_CHAT_ID_HERE'):
        return False
    
    message = format_order_message(order)
    url = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage"
    
    try:
        response = requests.post(url, json={
            'chat_id': settings.TELEGRAM_CHAT_ID,
            'text': message,
            'parse_mode': 'HTML'
        }, timeout=10)
        return response.json().get('ok', False)
    except Exception:
        return False


def format_order_message(order):
    """Format order message for Telegram"""
    message = f"🛒 <b>Новый заказ #{order.id}</b>\n\n"
    message += f"<b>Клиент:</b> {order.customer_name}\n"
    message += f"<b>Телефон:</b> {order.customer_phone}\n"
    message += f"<b>Адрес:</b> {order.customer_address}\n"
    if order.customer_comment:
        message += f"<b>Комментарий:</b> {order.customer_comment}\n"
    message += f"\n<b>Товары:</b>\n"
    
    for item in order.items.all():
        message += f"{item.product_name} - {item.quantity} шт. × {item.price} сом = {item.subtotal} сом\n"
    
    message += f"\n<b>Итого: {order.total} сом</b>"
    
    return message


@csrf_exempt
@require_http_methods(["POST"])
def create_caragana_request(request):
    """
    Принимает заявку на сбор/сдачу караганы и отправляет в Telegram.
    Данные: name, phone, comment (объём кг, район/адрес, сроки — откуда берутся: из формы на сайте).
    Telegram: TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID берутся из переменных окружения (см. .env.example).
    """
    try:
        data = json.loads(request.body)
        name = (data.get('name') or '').strip()
        phone = (data.get('phone') or '').strip()
        comment = (data.get('comment') or '').strip()

        if not name or not phone:
            return JsonResponse({
                'success': False,
                'error': 'Имя и телефон обязательны.'
            }, status=400)

        # Отправка в Telegram (те же настройки, что и для заказов)
        success = send_caragana_request_to_telegram(name=name, phone=phone, comment=comment)

        return JsonResponse({
            'success': True,
            'telegram_sent': success
        })
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)


def send_caragana_request_to_telegram(name, phone, comment):
    """Отправка заявки на карагану в Telegram. Chat ID и токен из settings (env)."""
    if (settings.TELEGRAM_BOT_TOKEN == 'YOUR_BOT_TOKEN_HERE' or
        settings.TELEGRAM_CHAT_ID == 'YOUR_CHAT_ID_HERE'):
        return False

    message = "🌿 <b>Заявка на сбор и сдачу караганы</b>\n\n"
    message += f"<b>Имя:</b> {name}\n"
    message += f"<b>Телефон:</b> {phone}\n"
    if comment:
        message += f"<b>Комментарий:</b>\n{comment}\n"
    message += "\n<i>Укажите в комментарии: объём (кг), район/адрес сбора, желаемые сроки.</i>"

    url = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage"
    try:
        response = requests.post(url, json={
            'chat_id': settings.TELEGRAM_CHAT_ID,
            'text': message,
            'parse_mode': 'HTML'
        }, timeout=10)
        return response.json().get('ok', False)
    except Exception:
        return False
