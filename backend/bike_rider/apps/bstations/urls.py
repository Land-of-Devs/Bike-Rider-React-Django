from .views import BStationViewSet
from django.conf.urls import url

urlpatterns = [
    url(r'bstations', BStationViewSet.as_view({'post': 'create', 'get': 'list'})),
]
