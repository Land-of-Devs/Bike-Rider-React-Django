from django.template import RequestContext
from rest_framework import serializers
from bike_rider.apps.bikes.models import Bike

class BikeRelatedField(serializers.RelatedField):
    
    def to_representation(self, value):
        from bike_rider.apps.bikes.serializers import BikeStationMaintainerSerializer
        return BikeStationMaintainerSerializer(value).data

class BikeCookieRelatedField(serializers.RelatedField):
    
    def to_representation(self, value):
        from bike_rider.apps.bikes.serializers import BikeCookieSerializer
        return BikeCookieSerializer(value).data
