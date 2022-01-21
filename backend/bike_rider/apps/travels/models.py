from django.db import models
from django.utils import timezone
from bike_rider.apps.users.models import User
from bike_rider.apps.bikes.models import Bike
from bike_rider.apps.bstations.models import BStation

class Travel(models.Model):
    start = models.DateTimeField(default=timezone.now)
    finish = models.DateTimeField()
    user = models.ForeignKey(User, null=True,on_delete=models.SET_NULL)
    bike = models.ForeignKey(Bike, null=True, on_delete=models.SET_NULL)
    origin = models.ForeignKey(BStation, null=True, related_name="origin", on_delete=models.SET_NULL)
    destination = models.ForeignKey(BStation, null=True, related_name="destination", on_delete=models.SET_NULL)