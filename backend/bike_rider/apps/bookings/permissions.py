from rest_framework import permissions
from .models import Booking

class HasNotBooking(permissions.BasePermission):
    message = 'You don\'t have access to this action!'

    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, obj):
        try:
            print("HASNOT")
            booking = Booking.objects.filter(
                user=request.user
            ).exists()
            
            return booking
        except Exception as e:
            return False