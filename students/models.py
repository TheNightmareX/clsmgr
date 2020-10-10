from django.db import models
import typing

class Student(models.Model):
    last_name = models.CharField('姓', max_length=1)
    first_name = models.CharField('名', max_length=3)

    def name(self):
        return self.last_name + self.first_name

    def __str__(self):
        return f"{self.id}# {self.name()}"