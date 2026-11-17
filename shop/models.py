from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator


class Product(models.Model):
    """Product model with multilingual support"""
    name_ky = models.CharField(_('Name (Kyrgyz)'), max_length=200)
    name_ru = models.CharField(_('Name (Russian)'), max_length=200)
    name_en = models.CharField(_('Name (English)'), max_length=200)
    
    description_ky = models.TextField(_('Description (Kyrgyz)'), blank=True)
    description_ru = models.TextField(_('Description (Russian)'), blank=True)
    description_en = models.TextField(_('Description (English)'), blank=True)
    
    price = models.DecimalField(_('Price'), max_digits=10, decimal_places=2, 
                                validators=[MinValueValidator(0)])
    in_stock = models.BooleanField(_('In Stock'), default=True)
    created_at = models.DateTimeField(_('Created At'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Updated At'), auto_now=True)
    
    class Meta:
        verbose_name = _('Product')
        verbose_name_plural = _('Products')
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name_ru
    
    def get_name(self, lang='ru'):
        """Get product name in specified language"""
        return getattr(self, f'name_{lang}', self.name_ru)
    
    def get_description(self, lang='ru'):
        """Get product description in specified language"""
        return getattr(self, f'description_{lang}', self.description_ru)


class ProductImage(models.Model):
    """Product images - multiple images per product"""
    product = models.ForeignKey(Product, related_name='images', 
                                on_delete=models.CASCADE)
    image = models.ImageField(_('Image'), upload_to='products/')
    order = models.PositiveIntegerField(_('Order'), default=0)
    created_at = models.DateTimeField(_('Created At'), auto_now_add=True)
    
    class Meta:
        verbose_name = _('Product Image')
        verbose_name_plural = _('Product Images')
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return f"{self.product.name_ru} - Image {self.order}"


class Order(models.Model):
    """Order model"""
    STATUS_CHOICES = [
        ('new', _('New')),
        ('processing', _('Processing')),
        ('completed', _('Completed')),
        ('cancelled', _('Cancelled')),
    ]
    
    customer_name = models.CharField(_('Customer Name'), max_length=200)
    customer_phone = models.CharField(_('Customer Phone'), max_length=20)
    customer_address = models.TextField(_('Delivery Address'))
    customer_comment = models.TextField(_('Comment'), blank=True)
    
    status = models.CharField(_('Status'), max_length=20, 
                             choices=STATUS_CHOICES, default='new')
    total = models.DecimalField(_('Total'), max_digits=10, decimal_places=2)
    
    created_at = models.DateTimeField(_('Created At'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Updated At'), auto_now=True)
    sent_to_telegram = models.BooleanField(_('Sent to Telegram'), default=False)
    
    class Meta:
        verbose_name = _('Order')
        verbose_name_plural = _('Orders')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Order #{self.id} - {self.customer_name}"


class OrderItem(models.Model):
    """Order items"""
    order = models.ForeignKey(Order, related_name='items', 
                             on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_name = models.CharField(_('Product Name'), max_length=200)
    quantity = models.PositiveIntegerField(_('Quantity'), 
                                          validators=[MinValueValidator(1)])
    price = models.DecimalField(_('Price'), max_digits=10, decimal_places=2)
    
    class Meta:
        verbose_name = _('Order Item')
        verbose_name_plural = _('Order Items')
    
    def __str__(self):
        return f"{self.product_name} x{self.quantity}"
    
    @property
    def subtotal(self):
        return self.quantity * self.price
