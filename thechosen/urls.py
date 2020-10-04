from django.urls import path

from thechosen import views


urlpatterns = [
    path('', views.index),
]