from django.shortcuts import render
from rest_framework import mixins, views, viewsets, status
from rest_framework.permissions import IsAuthenticated
from .permissions import NotUsedCoupon, CouponExist
from .serializers import UseCuponSerializer

class UseCouponViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated, CouponExist, NotUsedCoupon]
    serializer_class = UseCuponSerializer

    def create(self, request):

        context = {
            'user': request.user,
            'coupon': request.data['coupon']
        }
        serializer = self.serializer_class()
        serializer.useCupon(context)
        return views.Response({'status': 'ok'}, status=status.HTTP_200_OK)
        
        
