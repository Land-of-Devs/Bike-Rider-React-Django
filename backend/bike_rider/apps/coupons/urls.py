from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UseCouponViewSet

router = DefaultRouter()
router.register(r'use', UseCouponViewSet, basename='CouponUse')

urlpatterns = [
    path('coupons/', include(router.urls))
]
