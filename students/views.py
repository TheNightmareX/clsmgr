from django.shortcuts import render

from . import models


def student_list(request):
    context = { 'students': {} }
    for record in models.Student.objects.all():
        context['students'][record.id] = record.name()
    return render(request, 'students/list.html', context)