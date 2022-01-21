from django.db import models
from django.utils import timezone
from bike_rider.apps.users.models import User

class Booking(models.Model):
    time_start = models.DateTimeField(default=timezone.now)
    time_end = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
