from rest_framework import serializers
from . import models


class StudentEditRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentEditRequest
        fields = ('id', 'target_id', 'target_value', 'remark',
                  'creation_time', 'last_modified', 'status', 'message')
