from django.urls import path

from students import views


urlpatterns = [
    path('list/', views.student_list)
]