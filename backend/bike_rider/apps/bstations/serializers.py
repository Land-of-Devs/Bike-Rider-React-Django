import jwt
from pprint import pprint

from django.conf import settings
from rest_framework import serializers, exceptions

from .models import BStation
from bike_rider.apps.bookings.serializers import BookingBStationSerializer
from ..users.serializers import ThumbnailSerializer

#from bike_rider.apps.core.utils import MaintenancePrivateField


class BStationConfigureSerializer(serializers.Serializer):
    token = serializers.CharField()

    def use_and_generate_session_token(self, from_ip):
        try:
            token = self.data['token']
            pload = jwt.decode(token, settings.JWT_AUTH['JWT_STATION_CONFIG_SECRET_KEY'])
        except:
            raise exceptions.AuthenticationFailed('Invalid station token.')
        
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
            settings.JWT_AUTH['JWT_ALGORITHM']
        ).decode('utf-8')

        return token


class BStationSerializer(serializers.ModelSerializer):
    av_slots = serializers.IntegerField(read_only=True)
    av_bike_ct = serializers.SerializerMethodField(read_only=True, method_name='get_av_bike_ct')
    bk_bike_ct = serializers.IntegerField(read_only=True)
    bookings = BookingBStationSerializer(read_only=True, many=True)
    
    maint_ticket_ct = serializers.IntegerField(read_only=True, required=False)

    class Meta:
        model = BStation
        exclude = ['maintainer', 'ip']

    def get_av_bike_ct(self, instance):
        try:
            return instance.av_bike_ct - instance.bk_bike_ct
        except:
            return None


class BStationMaintenanceSerializer(serializers.ModelSerializer):
    maintainer = ThumbnailSerializer()

    class Meta:
        model = BStation
        fields = '__all__'

 
class BStationDistSerializer(BStationSerializer):
    approx_dist = serializers.FloatField(read_only=True)
    dist = serializers.FloatField(read_only=True)

    class Meta:
        model = BStation
        exclude = ['maintainer', 'ip']
