from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Product, ProductImage, Order, OrderItem


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ('image', 'order')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name_ru', 'price', 'in_stock', 'created_at')
    list_filter = ('in_stock', 'created_at')
    search_fields = ('name_ru', 'name_ky', 'name_en', 'description_ru')
    inlines = [ProductImageInline]
    fieldsets = (
        (_('Kyrgyz'), {
            'fields': ('name_ky', 'description_ky')
        }),
        (_('Russian'), {
            'fields': ('name_ru', 'description_ru')
        }),
        (_('English'), {
            'fields': ('name_en', 'description_en')
        }),
        (_('General'), {
            'fields': ('price', 'in_stock')
        }),
    )


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    readonly_fields = ('product', 'product_name', 'quantity', 'price')
    can_delete = False
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer_name', 'customer_phone', 'status', 
                   'total', 'created_at', 'sent_to_telegram')
    list_filter = ('status', 'sent_to_telegram', 'created_at')
    search_fields = ('customer_name', 'customer_phone', 'customer_address')
    readonly_fields = ('created_at', 'updated_at', 'sent_to_telegram')
    inlines = [OrderItemInline]
    fieldsets = (
        (_('Customer Information'), {
            'fields': ('customer_name', 'customer_phone', 'customer_address', 
                      'customer_comment')
        }),
        (_('Order Information'), {
            'fields': ('status', 'total', 'sent_to_telegram', 
                      'created_at', 'updated_at')
        }),
    )
    
    def has_add_permission(self, request):
        return False  # Orders can only be created through the website
