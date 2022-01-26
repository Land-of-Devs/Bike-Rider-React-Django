from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from django.db.models import Value, IntegerField
from .models import BStation
from .serializers import BStationSerializer, BStationDistSerializer

from bike_rider.apps.core.utils import ApproxDistance, Distance, to_float_or_none

class BStationViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        lat = to_float_or_none(self.request.query_params.get('lat'))
        lon = to_float_or_none(self.request.query_params.get('lon'))
        max_dist_km = 250

        if lat is not None and lon is not None:
            queryset = BStation.objects.all().annotate(
                approx_dist=ApproxDistance('lat', 'lon', lat, lon)
            ).filter(
                approx_dist__lte=max_dist_km*1.5
            ).annotate(
                dist=Distance('lat', 'lon', lat, lon)
            ).filter(
                dist__lte=max_dist_km
            )
        else:
            queryset = BStation.objects.all()

        return queryset
    
    def get_serializer_class(self):
        lat = to_float_or_none(self.request.query_params.get('lat'))
        lon = to_float_or_none(self.request.query_params.get('lon'))
        if lat is not None and lon is not None:
            return BStationDistSerializer
        else:
            return BStationSerializer