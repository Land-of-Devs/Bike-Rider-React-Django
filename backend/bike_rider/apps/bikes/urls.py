from rest_framework.routers import DefaultRouter
from django.urls import include, path

from .views import BikeHookViewSet, ChangeBikeStatusViewSet, BikeMaintainerListViewSet

router = DefaultRouter()
router.register(r'hook', BikeHookViewSet, basename='StBikeHook')
router.register(r'unhook', BikeHookViewSet, basename='StBikeUnhook')
router.register(r'status', ChangeBikeStatusViewSet, basename='ChangeBikeStatus')
router.register(r'on-road', BikeMaintainerListViewSet, basename='ListOnRoadBikes')

urlpatterns = [
  path('bikes/', include(router.urls))
]
