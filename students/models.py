from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.id}#\t{self.name}"


class StudentEditRequest(models.Model):
    target_id = models.IntegerField()
    target_value = models.CharField(max_length=20, blank=True, null=True)
    remark = models.CharField(max_length=255, blank=True, null=True)
    creation_time = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10, choices=[(
        'O', 'open'), ('C', 'closed'), ('A', 'approved')], default='O')
    message = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"id: {self.id}, target_id: {self.target_id}, target_value: {self.target_value}, status: {self.status}"
