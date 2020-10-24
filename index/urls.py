from django.urls import path

from . import views


urlpatterns = [
    path('', views.index),
    path('students/list/', views.StudentListView.as_view()),
    path('students/edit-requests/list', views.GetEditRequestListApi.as_view()),
    path('students/edit-requests/create', views.CreateEditRequestListApi.as_view()),
]