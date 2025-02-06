from django.urls import path
from . import views

urlpatterns = [
    path('call/', views.call_api, name='call_api'),
]