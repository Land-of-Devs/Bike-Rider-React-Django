from django.conf import settings
from django.db import models
from django.utils import timezone
from bike_rider.apps.bstations.models import BStation

class Bike(models.Model):
    STATUS_CHOICES = [
        ('OK', 'ok'),
        ('REPAIRING', 'repairing'),
        ('UNAVAILABLE', 'unavaliable')
    ]
    station = models.ForeignKey(BStation, related_name='bike', on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(choices=STATUS_CHOICES, max_length=32)
    last_check = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.id)
