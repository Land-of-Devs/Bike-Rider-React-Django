from rest_framework import serializers
from .models import Coupon, UsedCoupon

class UseCuponSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UsedCoupon
        fields = '__all__'

    def useCupon(self, context):
        coupon = Coupon.objects.get(pk=context['coupon']) 
        # Valid coupon
        user = context['user']
        user.free_minutes += coupon.minutes
        coupon.uses -= 1

        if coupon.uses == 0:
            coupon.delete()
        else:
            coupon.save()
            UsedCoupon.objects.create(user=user, coupon=coupon)

        user.save()