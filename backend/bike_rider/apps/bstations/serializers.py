from rest_framework import serializers
from .models import BStation
from bike_rider.apps.bookings.serializers import BookingBStationSerializer

from ..users.serializers import ThumbnailSerializer

#from bike_rider.apps.core.utils import MaintenancePrivateField

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
