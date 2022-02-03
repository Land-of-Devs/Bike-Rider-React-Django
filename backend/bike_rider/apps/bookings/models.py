from django.db import models
from django.utils import timezone
from bike_rider.apps.users.models import User
from bike_rider.apps.bstations.models import BStation

class Booking(models.Model):
    time_start = models.DateTimeField(default=timezone.now)
    time_end = models.DateTimeField()
    user = models.ForeignKey(User, related_name='booking', on_delete=models.CASCADE)
    station = models.ForeignKey(BStation, related_name='booking', on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.user) + ' ('+ str(self.id) +')'