from django.urls import path

from . import views


urlpatterns = [
    path('', views.IndexView.as_view()),
    path('students/list/', views.StudentListView.as_view()),
    path('students/edit-requests', views.StudentEditRequestAPIView.as_view()),
]