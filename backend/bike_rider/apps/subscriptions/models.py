from django.db import models

class Subscription(models.Model):
    name = models.CharField(max_length=32) 
    min_minutes = models.DurationField()
    cent_minute = models.IntegerField()

    def __str__(self):
        return self.name