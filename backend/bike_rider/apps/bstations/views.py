import datetime

from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from django.db.models import Value, IntegerField, Count, Q, F, Subquery, OuterRef

from .models import BStation
from .serializers import BStationSerializer, BStationDistSerializer
from bike_rider.apps.core.utils import ApproxDistance, Distance, to_float_or_none


class BStationViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]

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
            ) # - F('bk_bike_ct'), # repeats query, done in serializer
        )

        # if self.request.user and self.request.user.role == 'MAINTENANCE':
        #     queryset = queryset.annotate(
        #         total_=Subquery(
        #             BStation.objects.annotate()()
        #         )
        #     )

        return queryset

    def get_serializer_class(self):
        lat = to_float_or_none(self.request.query_params.get('lat'))
        lon = to_float_or_none(self.request.query_params.get('lon'))
        if lat is not None and lon is not None:
            return BStationDistSerializer
        else:
            return BStationSerializer
