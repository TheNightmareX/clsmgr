from django.urls import path

from sysmgr import views


urlpatterns = [
    path('stulist/', views.stulist)
]