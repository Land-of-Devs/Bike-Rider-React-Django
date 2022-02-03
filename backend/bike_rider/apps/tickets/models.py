from django.db import models
from django.utils import timezone
from bike_rider.apps.users.models import User
from bike_rider.apps.bikes.models import Bike
from bike_rider.apps.bstations.models import BStation

class Ticket(models.Model):
    TYPE_TICKETS = [
        ('MAINTENANCE', 'maintenance'),
        ('SUPPORT', 'support')
    ]
    STATUS_TICKETS = [
        ('PENDING', 'pending'),
        ('RESOLVED', 'resolved'),
        ('CANCELED', 'canceled')
    ]
    title = models.CharField(max_length=30)
    client = models.ForeignKey(User, related_name='ticket', on_delete=models.SET_NULL, null=True)
    type = models.CharField(choices=TYPE_TICKETS, max_length=40)
    status = models.CharField(choices=STATUS_TICKETS, default='PENDING', max_length=40)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(str(self.client) + ' ('+ str(self.id) + ')')

class MaintenanceTicket(models.Model):
    TYPE_OBJECT = [
        ('BIKES', 'bikes'),
        ('STATION', 'station')
    ]
    ticket_head = models.ForeignKey(Ticket, limit_choices_to={'type': 'MAINTENANCE'}, related_name='maintenance_ticket', on_delete=models.CASCADE)
    type = models.CharField(choices=TYPE_OBJECT, max_length=40)
    bike_id = models.ForeignKey(Bike, related_name='maintenance_ticket', on_delete=models.CASCADE, default=None, blank=True, null=True)
    station_id = models.ForeignKey(BStation, related_name='maintenance_ticket', on_delete=models.CASCADE, null=True, default=None, blank=True)
    message = models.CharField(max_length=255)

    def __str__(self):
        return str(str(self.id) + ' ('+ str(self.ticket_head) + ')')

    
class SupportTicket(models.Model):
    TYPE_SUBJECTS = [
        ('ACCOUNT', 'account'),
        ('TRAVELS', 'travels'),
    ]
    ticket_head = models.ForeignKey(Ticket, limit_choices_to={'type': 'SUPPORT'}, related_name='support_ticket', on_delete=models.CASCADE)
    type = models.CharField(choices=TYPE_SUBJECTS, max_length=40)
    message = models.CharField(max_length=255)

    def __str__(self):
        return str(str(self.id) + ' ('+ str(self.ticket_head) + ')')
