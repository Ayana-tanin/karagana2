from django.urls import path
from . import views

app_name = 'shop'

urlpatterns = [
    path('', views.index, name='index'),
    path('api/products/', views.get_products_json, name='products_json'),
    path('api/order/', views.create_order, name='create_order'),
    path('api/caragana-request/', views.create_caragana_request, name='caragana_request'),
]
