from django.urls import path

from . import views


urlpatterns = [
    path('list/', views.StudentListView.as_view()),
    path('edit-requests/list', views.EditRequestListView.as_view()),
    path('edit-requests/create', views.CreateEditRequestListView.as_view()),
]