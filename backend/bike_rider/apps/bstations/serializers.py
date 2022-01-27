from rest_framework import serializers
from .models import BStation

#from bike_rider.apps.core.utils import MaintenancePrivateField

class BStationSerializer(serializers.ModelSerializer):
    av_slots = serializers.IntegerField(read_only=True)
    av_bike_ct = serializers.SerializerMethodField(read_only=True, method_name='get_av_bike_ct')
    bk_bike_ct = serializers.IntegerField(read_only=True)
    
    maint_ticket_ct = serializers.IntegerField(read_only=True, required=False)

    class Meta:
        model = BStation
        fields = ['name', 'lat', 'lon', 'image', 'nslots', 'av_slots', 'av_bike_ct', 'bk_bike_ct', 'maint_ticket_ct']

    def get_av_bike_ct(self, instance):
        try:
            return instance.av_bike_ct - instance.bk_bike_ct
        except:
            return None

class BStationDistSerializer(BStationSerializer):
    approx_dist = serializers.FloatField(read_only=True)
    dist = serializers.FloatField(read_only=True)

    class Meta:
        model = BStation
        fields = ['name', 'lat', 'lon', 'image', 'nslots', 'av_slots', 'av_bike_ct', 'bk_bike_ct', 'maint_ticket_ct', 'approx_dist', 'dist']
