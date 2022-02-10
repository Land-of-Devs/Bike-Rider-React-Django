from rest_framework.routers import DefaultRouter
from django.urls import include, path

from .views import BStationConfigureViewSet, BStationViewSet, BStationMaintenanceViewSet

router = DefaultRouter()
router.register(r'client', BStationViewSet, basename='StClient')
router.register(r'maintenance', BStationMaintenanceViewSet, basename='StMaintenance')
router.register(r'configure', BStationConfigureViewSet, basename='BStationConfigure')


urlpatterns = [
    path('stations/', include(router.urls)),
    #url(r'bstations', BStationViewSet.as_view({'post': 'create', 'get': 'list'})),
]
