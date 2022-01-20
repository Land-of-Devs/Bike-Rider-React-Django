from django.conf import settings
from django.db import models
from django.utils import timezone


class Bike(models.Model):
    station = models.ForeignKey(settings.STATION_MODEL, on_delete=models.CASCADE)
    status = models.TextChoices('OK', 'REPARING', 'UNAVALIABLE')
    last_check = models.DateTimeField(default=timezone.now)