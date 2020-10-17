from django.shortcuts import render
from django.http import HttpRequest
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.db.models.query import QuerySet
from django.views import generic as generic_views
import json
import datetime
from . import models


class StudentListView(generic_views.ListView):
    model = models.Student
    context_object_name = 'students'


class EditRequestListView(generic_views.View):
    def get_data(self):
        query_set: QuerySet = models.StudentEditRequest.objects.all()
        query_set = query_set.order_by('-id')
        data = []
        for record in query_set:
            record: models.StudentEditRequest
            creation_time: datetime.datetime = record.creation_time
            last_modified: datetime.datetime = record.last_modified
            creation_time: str = creation_time.strftime('%Y-%m-%d %H:%M:%S')
            last_modified: str = last_modified.strftime('%Y-%m-%d %H:%M:%S')
            data.append({
                'id': record.id,
                'target_id': record.target_id,
                'target_value': record.target_value,
                'remark': record.remark,
                'creation_time': creation_time,
                'last_modified': last_modified,
                'status': record.status,
                'message': record.message,
            })
        return data

    def get(self, request: HttpRequest):
        jsonData = json.dumps(self.get_data())
        return HttpResponse(jsonData)

class CreateEditRequestListView(generic_views.View):
    def post(self, request: HttpRequest):
        target_id = int(request.POST['target_id'])
        target_value = request.POST['target_value']
        remark = request.POST['remark']
        record = models.StudentEditRequest(target_id=target_id, target_value=target_value, remark=remark)
        record.save()
        return HttpResponse()