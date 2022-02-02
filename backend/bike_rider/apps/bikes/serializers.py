from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from .models import Bike
from pprint import pprint
from bike_rider.apps.bstations.serializers import BStationSerializer
from bike_rider.apps.bstations.models import BStation
from bike_rider.apps.travels.models import Travel
from django.utils import timezone

class BikeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    status = serializers.ChoiceField(Bike.STATUS_CHOICES)
    last_check = SerializerMethodField(method_name='get_last_check')
    station = BStationSerializer(required=False, read_only=True)

    class Meta:
        model = Bike
        fields = ['id', 'status', 'last_check', 'station']
        read_only_fields = ['id','station']

    def get_last_check(self, instance):
        return instance.last_check.isoformat()


class BikeHookSerializer(BikeSerializer):
    station = serializers.IntegerField()

    class Meta:
        model = Bike
        fields = '__all__'

    def hook(self, instance, context):
        station = BStation.objects.get(id=self.validated_data['station'])
        instance.station = station
        # Close travel
        travel = Travel.objects.filter(bike=instance, finish=None, destination=None).first()
        travel.finish = timezone.now()
        travel.destination = station
        travel.save()
        instance.save()

    def unhook(self, instance):
        pprint(instance)
