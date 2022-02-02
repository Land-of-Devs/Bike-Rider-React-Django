from rest_framework.routers import DefaultRouter
from django.urls import include, path

from .views import BikeHookViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'hook', BikeHookViewSet, basename='StBikeHook')

urlpatterns = [
  path('bikes/', include(router.urls))
]
