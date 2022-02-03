from django.db import models
from django.utils import timezone
from bike_rider.apps.users.models import User
from bike_rider.apps.bikes.models import Bike
from bike_rider.apps.bstations.models import BStation

class Travel(models.Model):
    user = models.ForeignKey(User, null=True, related_name="travel", on_delete=models.SET_NULL)
    start = models.DateTimeField(default=timezone.now)
    finish = models.DateTimeField(blank=True, null=True)
    bike = models.ForeignKey(Bike, null=True, related_name="travel", on_delete=models.SET_NULL)
    origin = models.ForeignKey(BStation, null=True, related_name="travel_o", on_delete=models.SET_NULL)
    destination = models.ForeignKey(BStation, blank=True, null=True, related_name="travel_d", on_delete=models.SET_NULL)
    sent_reminder = models.BooleanField(default=False)
    sent_warning = models.BooleanField(default=False)

    def __str__(self):
        return str(str(self.user) + str(self.id))