from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from .models import Bike
from pprint import pprint
from bike_rider.apps.bstations.serializers import BStationSerializer
from bike_rider.apps.travels.models import Travel
from bike_rider.apps.bstations.models import BStation
from django.utils import timezone
from rest_framework.exceptions import NotAcceptable
from .relation import TicketRelatedField

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

class BikeCookieSerializer(BikeSerializer):
    station = None
    class Meta:
        model = Bike
        exclude = ['station']
        depth = 1


class BikeStatusSerializer(BikeSerializer):
    status = serializers.ChoiceField(Bike.STATUS_CHOICES)
    station = None
    class Meta:
        model = Bike
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.status = validated_data.get('status')
        instance.save()
        return instance

class BikeStationMaintainerSerializer(BikeSerializer):
    station = None
    maintenance_ticket = TicketRelatedField(many=True, read_only=True)

    class Meta:
        model = Bike
        exclude = []

class BikeHookSerializer(BikeSerializer):
    class Meta:
        model = Bike
        fields = '__all__'

    def hook(self, instance, context):
        station = context['station']
        if instance.station:
            raise NotAcceptable('The bike already is in the station')

        instance.station = station
        # Close travel
        travel = Travel.objects.get(bike=instance, finish=None, destination=None)
        travel.finish = timezone.now()
        travel.destination = station
        travel.save()
        instance.save()

    def unhook(self, instance, context):
        if not instance.station:
            raise NotAcceptable('The bike isn\'t in the station')

        instance.station = None
        travel = Travel.objects.create(
            start=timezone.now(),
            user=context['user'],
            origin=context['station'],
            bike=instance
        )
        instance.save()
