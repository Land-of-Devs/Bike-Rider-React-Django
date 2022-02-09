from django.db import models
from bike_rider.apps.users.models import User

# Create your models here.

class Coupon(models.Model):
    code = models.CharField(max_length=8, null=False, primary_key=True)
    minutes = models.IntegerField()
    uses = models.IntegerField()

class UsedCoupon(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    coupon = models.ForeignKey(Coupon, on_delete=models.CASCADE)