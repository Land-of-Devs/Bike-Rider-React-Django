from django.contrib import admin
from .models import MaintenanceTicket, SupportTicket, Ticket

admin.site.register(MaintenanceTicket)
admin.site.register(SupportTicket)
admin.site.register(Ticket)