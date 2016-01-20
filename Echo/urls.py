from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'play/', views.play),
    url(r'', views.index),
]
