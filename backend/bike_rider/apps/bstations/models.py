from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class BStation(models.Model):
    name = models.CharField(max_length=32) 
    lat = models.FloatField(validators=[MinValueValidator(-90.0), MaxValueValidator(90.0)])
    lon = models.FloatField(validators=[MinValueValidator(-180.0), MaxValueValidator(180.0)])
    image = models.CharField(max_length=255)
    nslots = models.IntegerField()
    ip = models.GenericIPAddressField(null=True)
