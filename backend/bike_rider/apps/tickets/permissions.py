from rest_framework import permissions
from django.db.models import Q
from bike_rider.apps.tickets.models import MaintenanceTicket

class HisMaintenanceTickets(permissions.BasePermission):

    message = 'You don\'t have access to this action!'

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'MAINTENANCE'

    def has_object_permission(self, request, view, obj):

        try:
            ticket = MaintenanceTicket.objects.filter(
                ticket_head_id=obj.id
            ).filter(
                Q(station_id__maintainer=request.user) | 
                Q(bike_id__station__maintainer=request.user)
            ).exists()
            return ticket
            
        except Exception as e:
            return False