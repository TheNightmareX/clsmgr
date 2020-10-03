from django.shortcuts import render


def thechosen(request):
    return render(request, 'tools/thechosen.html')