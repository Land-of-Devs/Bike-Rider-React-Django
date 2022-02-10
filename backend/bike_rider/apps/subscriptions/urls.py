from .views import SubscriptionsViewSet, ChangeUserSubscriptionViewSet
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'list', SubscriptionsViewSet, basename='Subscriptions')

urlpatterns = [
    path('subscriptions/', include(router.urls)),
    path('subscriptions/change', ChangeUserSubscriptionViewSet.as_view(), name='ChangeUserSubscription')
]
