from django.shortcuts import render
from django.views import generic as generic_views
from . import models


class StudentListView(generic_views.ListView):
    model = models.Student
    context_object_name = 'students'