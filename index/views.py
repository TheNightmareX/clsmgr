from django.shortcuts import render
from django.db.models.query import QuerySet
from django.views.generic import ListView, TemplateView

from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from . import models, serializers


class IndexView(TemplateView):
    template_name = 'index/main.html'


class StudentListView(ListView):
    model = models.Student
    context_object_name = 'students'


class StudentEditRequestAPIView(APIView):
    def get(self, request: Request):
        queryset: QuerySet = models.StudentEditRequest.objects.all()
        queryset = queryset.order_by('-id')[:20]
        serializer = serializers.StudentEditRequestSerializer(
            queryset, many=True)
        return Response(serializer.data)

    def post(self, request: Request):
        serializer = serializers.StudentEditRequestSerializer(
            data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response()
        return Response(status=status.HTTP_400_BAD_REQUEST)
