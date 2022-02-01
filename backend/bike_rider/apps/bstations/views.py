import datetime
import jwt

from rest_framework import viewsets, views
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from django.db.models import Count, Q, F, Subquery, OuterRef
from django.conf import settings

from .models import BStation
from bike_rider.apps.bookings.models import Booking
from .serializers import BStationConfigureSerializer, BStationSerializer, BStationDistSerializer, BStationMaintenanceSerializer
from bike_rider.apps.core.utils import ApproxDistance, Distance, to_float_or_none
from bike_rider.apps.core.permissions import IsMaintenanceUsr, IsAdminUsr, IsMaintainerOf, IsSuperAdminUsr


class BStationConfigureViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    serializer_class = BStationConfigureSerializer

    def list(self, request):
        serializer = BStationSerializer(request.station)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        ip = request.META.get('REMOTE_ADDR')
        token = serializer.use_and_generate_session_token(ip)

        response = Response(status=200)

        response.set_cookie(
            settings.JWT_AUTH['JWT_STATION_COOKIE'],
            token,
            expires=datetime.datetime.strptime('9999', '%Y'),
            httponly=True,
            samesite='Lax' # TODO: change to strict on prod
        )
        
        return response


class BStationMaintenanceViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAdminUsr | (IsMaintenanceUsr & IsMaintainerOf)]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return BStation.objects.all()

        return BStation.objects.filter(maintainer=self.request.user.id)

    def get_serializer_class(self):
        return BStationMaintenanceSerializer


class BStationViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]

    def get_object(self):
        o = super().get_object()
        o.bookings = Booking.objects.filter(station=o.id)
        return o

    def get_queryset(self):
        queryset = BStation.objects.all()

        lat = to_float_or_none(self.request.query_params.get('lat'))
        lon = to_float_or_none(self.request.query_params.get('lon'))
        max_dist_km = 250

        if lat is not None and lon is not None:
            queryset = queryset.annotate(
                # First quick approx distance pass to filter many unneeded stations
                approx_dist=ApproxDistance('lat', 'lon', lat, lon)
            ).filter(
                approx_dist__lte=max_dist_km*1.5
            ).annotate(
                dist=Distance('lat', 'lon', lat, lon),
            ).filter(
                dist__lte=max_dist_km
            )

        queryset = BStation.annotate_slot_info(queryset)

        user = self.request.user
        if user and user.is_authenticated and (user.is_superuser or user.role == 'MAINTENANCE'):
            queryset = BStation.annotate_maint_ticket_ct(queryset)

        return queryset

    def get_serializer_class(self):
        lat = to_float_or_none(self.request.query_params.get('lat'))
        lon = to_float_or_none(self.request.query_params.get('lon'))
        if lat is not None and lon is not None:
            return BStationDistSerializer
        else:
            return BStationSerializer
