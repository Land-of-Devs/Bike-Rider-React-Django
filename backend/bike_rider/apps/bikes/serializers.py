from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from .models import Bike
from bike_rider.apps.bstations.serializers import BStationSerializer

class BikeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    status = serializers.ChoiceField(Bike.STATUS_CHOICES)
    last_check = SerializerMethodField(method_name='get_created_at')
    station = BStationSerializer(required=False, read_only=True)

    class Meta:
        model = Bike
        fields = ['id', 'status', 'last_check', 'station']
        read_only_fields = ['id','station']

    def get_created_at(self, instance):
        return instance.created_at.isoformat()