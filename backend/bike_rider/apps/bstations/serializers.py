import jwt

from django.conf import settings
from rest_framework import serializers, exceptions

from .models import BStation
from bike_rider.apps.bookings.serializers import BookingBStationSerializer
from ..users.serializers import ThumbnailSerializer
from ..bikes.models import Bike
from ..bikes.relation import TicketRelatedField
from .relations import BikeRelatedField, BikeCookieRelatedField

#from bike_rider.apps.core.utils import MaintenancePrivateField


class BStationConfigureSerializer(serializers.Serializer):
    token = serializers.CharField()

    def use_and_generate_session_token(self, from_ip):
        try:
            token = self.data['token']
            pload = jwt.decode(token, settings.JWT_AUTH['JWT_STATION_CONFIG_SECRET_KEY'], algorithms=settings.JWT_AUTH['ALGORITHM'])
        except Exception as e:
            raise exceptions.AuthenticationFailed('Invalid station token.' + str(e) + token)

        try:
            station = BStation.objects.get(pk=pload['station_id'], ip=None)
        except:
            raise exceptions.NotFound('Invalid station ID in config token or expired.')

        station.ip = from_ip
        station.save()

        s_payload = {
            'ip': from_ip,
            'station_id': station.id
        }

        token = jwt.encode(
            s_payload,
            settings.JWT_AUTH['JWT_STATION_SECRET_KEY'],
            settings.JWT_AUTH['ALGORITHM']
        )

        return (token, station)


class BStationSerializer(serializers.ModelSerializer):
    av_slots = serializers.IntegerField(read_only=True)
    av_bike_ct = serializers.IntegerField(read_only=True)
    bk_bike_ct = serializers.IntegerField(read_only=True)
    bookings = BookingBStationSerializer(read_only=True, many=True)

    maint_ticket_ct = serializers.IntegerField(read_only=True, required=False)

    class Meta:
        model = BStation
        exclude = ['maintainer', 'ip']


class BStationCookieSerializer(BStationSerializer):
    bikes = BikeCookieRelatedField(many=True, read_only=True)
    class Meta:
        model = BStation
        exclude = ['maintainer', 'ip']
        depth = 0


class BStationMaintenanceSerializer(serializers.ModelSerializer):
    maintainer = ThumbnailSerializer()
    maintenance_ticket = TicketRelatedField(many=True, read_only=True)
    bike = BikeRelatedField(many=True, read_only=True)
    # serializers.PrimaryKeyRelatedField(source='bike', read_only=True)

    class Meta:
        model = BStation
        fields = ['id', 'maintainer', 'name', 'lat', 'lon', 'image', 'nslots', 'ip', 'maintenance_ticket', 'bike']
        depth = 1


class BStationDistSerializer(BStationSerializer):
    approx_dist = serializers.FloatField(read_only=True)
    dist = serializers.FloatField(read_only=True)

    class Meta:
        model = BStation
        exclude = ['maintainer', 'ip']
