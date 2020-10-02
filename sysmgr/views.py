from django.shortcuts import render

def stulist(request):
    return render(request, 'sysmgr/stulist.html')