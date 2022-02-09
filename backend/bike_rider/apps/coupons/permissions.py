from rest_framework import permissions
from django.db.models import Q
from bike_rider.apps.tickets.models import MaintenanceTicket
from .models import UsedCoupon, Coupon

class NotUsedCoupon(permissions.BasePermission):

    message = 'You already used this coupon!'

    def has_permission(self, request, view):
        coupon_id = request.data.get('coupon', None)
        return not UsedCoupon.objects.filter(user=request.user, coupon_id=coupon_id).exists()


class CouponExist(permissions.BasePermission):

    message = 'Coupon invalid'

    def has_permission(self, request, view):
        coupon_id = request.data.get('coupon', None)
        return Coupon.objects.filter(pk=coupon_id).exists()
