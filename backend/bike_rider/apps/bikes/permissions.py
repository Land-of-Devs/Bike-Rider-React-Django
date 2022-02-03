from pprint import pprint
from rest_framework import permissions
from django.db.models import Q
from bike_rider.apps.tickets.models import Bike

class IsMaintainerBike(permissions.BasePermission):

    message = 'You don\'t have access to this action!'

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'MAINTENANCE'

    def has_object_permission(self, request, view, obj):

        try:
            pprint(obj)
            pprint('a')
            bike = Bike.objects.filter(pk=obj.id).filter(
                Q(station__maintainer=request.user.id) |
                Q(station=None)
            ).exists()
            pprint(bike)
            return bike
            
        except Exception as e:
            return False