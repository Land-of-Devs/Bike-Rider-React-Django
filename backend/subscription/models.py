from django.db import models

class Subscription(models.Model):
    name = models.CharField(max_length=32) 
    min_minutes = models.IntegerField()
    cent_minute = models.IntegeerField()