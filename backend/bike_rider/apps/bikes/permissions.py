from pprint import pprint
from rest_framework import permissions
from django.db.models import Q
from .models import Bike
from bike_rider.apps.travels.models import Travel

class IsMaintainerBike(permissions.BasePermission):

    message = 'You don\'t have access to this action!'

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'MAINTENANCE'

    def has_object_permission(self, request, view, obj):

        try:
            bike = Bike.objects.filter(pk=obj.id).filter(
                Q(station__maintainer=request.user.id) |
                Q(station=None)
            ).exists()

            return bike
            
        except Exception as e:
            return False

class NotActiveTravels(permissions.BasePermission):

    message = 'You already have a bike, this action will be report!'

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):

        try:
            travel = Travel.objects.filter(user=request.user).filter(
                Q(finish=None)
            ).exists()
            pprint(travel)
            return travel == False
            
        except Exception as e:
            return False