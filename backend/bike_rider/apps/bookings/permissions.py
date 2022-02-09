from rest_framework import permissions
from .models import Booking
from django.utils import timezone

class HasNotBooking(permissions.BasePermission):
    message = 'You already have a reservation!'

    def has_permission(self, request, view):
        try:
            booking = Booking.objects.filter(
                user=request.user,
                time_end__gt=timezone.now()
            ).exists()
            return booking == False
        except Exception as e:
            return False

class HasBooking(permissions.BasePermission):
    message = 'You don\'t have a reservation!'

    def has_permission(self, request, view):
        try:
            booking = Booking.objects.filter(
                user=request.user,
                time_end__gt=timezone.now()
            ).exists()
            return booking
        except Exception as e:
            return False