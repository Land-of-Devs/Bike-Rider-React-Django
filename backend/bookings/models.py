from django.db import models
from django.utils import timezone
from user.model import User

class Bookings(models.Model):
    time_start = models.DateTimeField(default=timezone.now)
    time_end = models.DateTimeField()
    user = models.ForeignKey(User)