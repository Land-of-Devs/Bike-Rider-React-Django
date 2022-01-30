from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator, FileExtensionValidator

from bike_rider.apps.users.models import User

class BStation(models.Model):
    name = models.CharField(max_length=32)
    lat = models.FloatField(validators=[MinValueValidator(-90.0), MaxValueValidator(90.0)])
    lon = models.FloatField(validators=[MinValueValidator(-180.0), MaxValueValidator(180.0)])
    image = models.FileField(upload_to='bstations', validators=[FileExtensionValidator(allowed_extensions=['png', 'jpg', 'jpeg'])])
    maintainer = models.ForeignKey(User, limit_choices_to={'role':'MAINTENANCE'}, related_name='bstation', on_delete=models.SET_NULL, null=True, blank=True)
    nslots = models.IntegerField(validators=[MinValueValidator(1)])
    ip = models.GenericIPAddressField(null=True, blank=True)
