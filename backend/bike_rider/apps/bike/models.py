from django.conf import settings
from django.db import models
from django.utils import timezone
from bike_rider.apps.bstation.models import BStation



class Bike(models.Model):
    STATUS_CHOICES = [
        ('OK', 'ok'),
        ('REPAIRING', 'repairing'),
        ('UNAVALIBALE', 'unavaliable')
    ]
    station = models.ForeignKey(BStation, on_delete=models.CASCADE)
    status = models.CharField(choices=STATUS_CHOICES, max_length=32)
    last_check = models.DateTimeField(default=timezone.now)
