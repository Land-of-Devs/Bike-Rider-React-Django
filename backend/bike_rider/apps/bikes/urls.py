from rest_framework.routers import DefaultRouter
from django.urls import include, path

from .views import BikeHookViewSet, ChangeBikeStatusViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'hook', BikeHookViewSet, basename='StBikeHook')
router.register(r'unhook', BikeHookViewSet, basename='StBikeUnhook')
router.register(r'status', ChangeBikeStatusViewSet, basename='ChangeBikeStatus')

urlpatterns = [
  path('bikes/', include(router.urls))
]
