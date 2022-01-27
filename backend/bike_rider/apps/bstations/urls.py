from rest_framework.routers import DefaultRouter
from django.conf.urls import include, url

from .views import BStationViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'bstations', BStationViewSet, basename='BStation')

urlpatterns = [
    url(r'^', include(router.urls)),
    #url(r'bstations', BStationViewSet.as_view({'post': 'create', 'get': 'list'})),
]
