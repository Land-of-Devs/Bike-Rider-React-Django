import datetime
import jwt

from rest_framework import viewsets
from rest_framework import views
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from django.db.models import Count, Q, F, Subquery, OuterRef
from django.conf import settings

from .models import BStation
from bike_rider.apps.bookings.models import Booking
from .serializers import BStationSerializer, BStationDistSerializer, BStationMaintenanceSerializer
from bike_rider.apps.core.utils import ApproxDistance, Distance, to_float_or_none
from bike_rider.apps.core.permissions import IsMaintenanceUsr, IsAdminUsr, IsMaintainerOf, IsSuperAdminUsr


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

        queryset = queryset.annotate(
            av_slots=F('nslots') - Count('bike'),
            bk_bike_ct=Subquery(
                BStation.objects.filter(
                    pk=OuterRef('pk')
                ).annotate(
                    bk_bike_ct=Count(
                        'booking',
                        filter=Q(booking__time_end__date__gt=datetime.date.today()))
                ).values('bk_bike_ct')),
            av_bike_ct=Count(
                'bike',
                filter=Q(bike__status='OK')
            )  # - F('bk_bike_ct'), # repeats query, done in serializer
        )

        user = self.request.user
        if user and user.is_authenticated and (user.is_superuser or user.role == 'MAINTENANCE'):
            queryset = queryset.annotate(
                maint_ticket_ct=Subquery(
                    BStation.objects.filter(
                        pk=OuterRef('pk')
                    ).annotate(
                        maint_ticket_ct=Count(
                            'maintenance_ticket__ticket_head',
                            filter=Q(
                                maintenance_ticket__ticket_head__status='PENDING')
                        )
                    ).values('maint_ticket_ct')
                )
            )

        return queryset

    def get_serializer_class(self):
        lat = to_float_or_none(self.request.query_params.get('lat'))
        lon = to_float_or_none(self.request.query_params.get('lon'))
        if lat is not None and lon is not None:
            return BStationDistSerializer
        else:
            return BStationSerializer
