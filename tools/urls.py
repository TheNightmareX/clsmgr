from django.urls import path

from tools import views


urlpatterns = [
    path('thechosen/', views.thechosen)
]