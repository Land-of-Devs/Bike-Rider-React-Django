from django.db import models

class BStation(models.Model):
    name = models.CharField(max_length=32) 
    lat = models.DecimalField(decimal_places=32, max_digits=32)
    lon = models.DecimalField(decimal_places=32, max_digits=32)
    image = models.CharField(max_length=255)
    nslots = models.IntegerField()
    ip = models.GenericIPAddressField(null=True)